import React from 'react';
import {Box} from '@components/Box';
import {PostComment} from '@domain/PostComment/entities';
import {Text} from '@components/Text';
import {ProfileAvatar} from '@components/ProfileAvatar';
import {usePostCommentRemove} from '@domain/PostComment/useCases/usePostCommentRemove';
import {Alert, Pressable} from 'react-native';
import {postCommentService} from '@domain/PostComment/postCommentService';
import {useToastService} from '@appservices/Toast/useToast';
import {ToastModel} from '@appservices/Toast/model';
interface Props {
  postComment: PostComment;
  userId: number | null;
  postAuthorId: number;
  onRemoveComment: () => void;
  postId: number;
}
export function PostCommentItem({
  postComment,
  userId,
  postAuthorId,
  onRemoveComment,
  postId,
}: Props) {
  const {showToast} = useToastService();
  const {mutate} = usePostCommentRemove(postId, {
    onSuccess: () => {
      onRemoveComment();
      showToast(
        new ToastModel({
          message: 'Comentário deletado',
          type: 'success',
          position: 'bottom',
        }),
      );
    },
  });

  const isAllowToDelete = postCommentService.isAllowToDelete(
    postComment,
    userId,
    postAuthorId,
  );

  function confirmRemove() {
    Alert.alert('Deseja excluir o comentário?', 'pressione confirmar', [
      {
        text: 'Confirmar',
        onPress: () => mutate({postCommentId: postComment.id}),
      },
      {
        text: 'Cancelar',
        style: 'cancel',
      },
    ]);
  }

  return (
    <Pressable
      disabled={!isAllowToDelete}
      onLongPress={confirmRemove}
      testID="post-comment-id">
      <Box flexDirection="row" alignItems="center" mb="s16">
        <ProfileAvatar imageURL={postComment.author.profileURL} />
        <Box ml="s12" flex={1}>
          <Text preset="paragraphSmall" bold>
            {postComment.author.userName}
          </Text>
          <Text preset="paragraphSmall" color="gray1">
            {postComment.message}
          </Text>
          <Text preset="paragraphSmall" color="gray1">
            {postComment.createdAtRelative}
          </Text>
        </Box>
      </Box>
    </Pressable>
  );
}
