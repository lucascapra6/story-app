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

export function PostCommentScreen({route}: AppRoutes<'PostComment'>) {
  const postId = route.params.postId;
  const {data, fetchInitialData, fetchNextPage, hasNextPage, refresh, loading} =
    usePostCommentList(postId);
  function renderItem({item}: ListRenderItemInfo<PostComment>) {
    return <PostCommentItem postComment={item} />;
  }

  useEffect(() => {
    fetchInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Screen flex={1} canGoBack title="Comentarios">
      <Box flex={1}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: Platform.select({android: 40}),
          }}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={refresh} />
          }
          ListFooterComponent={
            <PostCommentBottom
              fetchNextPage={fetchNextPage}
              hasNextPage={hasNextPage}
            />
          }
        />
        <PostCommentTextMessage postId={postId} onAddComment={refresh} />
      </Box>
    </Screen>
  );
}
