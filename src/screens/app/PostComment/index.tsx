import React, {useEffect} from 'react';
import {Screen} from '@components/Screen';
import {AppRoutes} from '@routes/navigationProps';
import {Text} from '@components/Text';
import {usePostCommentList} from '@domain/PostComment/useCases/usePostCommentList';
import {FlatList, ListRenderItemInfo} from 'react-native';
import {PostComment} from '@domain/PostComment/entities';
import {PostCommentItem} from '@screens/app/PostComment/components/PostComentItem';

export function PostCommentScreen({route}: AppRoutes<'PostComment'>) {
  const id = route.params.postId;
  const {data, fetchInitialData} = usePostCommentList(id);
  function renderItem({item}: ListRenderItemInfo<PostComment>) {
    return <PostCommentItem postComment={item} />;
  }

  useEffect(() => {
    fetchInitialData();
  }, []);

  console.log(data);
  return (
    <Screen canGoBack title="Comentarios">
      <FlatList data={data} renderItem={renderItem} />
    </Screen>
  );
}
