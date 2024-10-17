import React, {useEffect} from 'react';
import {Screen} from '@components/Screen';
import {AppRoutes} from '@routes/navigationProps';
import {usePostCommentList} from '@domain/PostComment/useCases/usePostCommentList';
import {FlatList, ListRenderItemInfo} from 'react-native';
import {PostComment} from '@domain/PostComment/entities';
import {PostCommentItem} from '@screens/app/PostComment/components/PostComentItem';
import {PostCommentBottom} from '@screens/app/PostComment/components/PostCommentBottom';

export function PostCommentScreen({route}: AppRoutes<'PostComment'>) {
  const id = route.params.postId;
  const {data, fetchInitialData, fetchNextPage, hasNextPage} =
    usePostCommentList(id);
  function renderItem({item}: ListRenderItemInfo<PostComment>) {
    return <PostCommentItem postComment={item} />;
  }

  useEffect(() => {
    fetchInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(data);
  return (
    <Screen canGoBack title="Comentarios">
      <FlatList
        data={data}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <PostCommentBottom
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
          />
        }
      />
    </Screen>
  );
}
