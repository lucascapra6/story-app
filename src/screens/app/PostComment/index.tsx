import React, {useEffect} from 'react';
import {Screen} from '@components/Screen';
import {AppRoutes} from '@routes/navigationProps';
import {usePostCommentList} from '@domain/PostComment/useCases/usePostCommentList';
import {
  FlatList,
  ListRenderItemInfo,
  Platform,
  RefreshControl,
} from 'react-native';
import {PostComment} from '@domain/PostComment/entities';
import {PostCommentItem} from '@screens/app/PostComment/components/PostComentItem';
import {PostCommentBottom} from '@screens/app/PostComment/components/PostCommentBottom';
import {Box} from '@components/Box';
import {PostCommentTextMessage} from '@screens/app/PostComment/components/PostCommentTextMessage';
import {useAuthCredentials} from '@appservices/AuthCredentials/useAuthCredetentials';

export function PostCommentScreen({route}: AppRoutes<'PostComment'>) {
  const postId = route.params.postId;
  const postAuthorId = route.params.postAuthorId;

  const {list, fetchNextPage, hasNextPage, refresh, isLoading} =
    usePostCommentList(postId);
  const {userId} = useAuthCredentials();
  function renderItem({item}: ListRenderItemInfo<PostComment>) {
    return (
      <PostCommentItem
        postComment={item}
        userId={userId}
        postAuthorId={postAuthorId}
        onRemoveComment={refresh}
        postId={postId}
      />
    );
  }

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Screen flex={1} canGoBack title="Comentarios">
      <Box flex={1}>
        <FlatList
          testID="post-comment-list"
          data={list}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: Platform.select({android: 40}),
          }}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={refresh} />
          }
          ListFooterComponent={
            <PostCommentBottom
              fetchNextPage={fetchNextPage}
              hasNextPage={hasNextPage}
            />
          }
        />
        <PostCommentTextMessage postId={postId} />
      </Box>
    </Screen>
  );
}
