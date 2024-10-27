import {postCommentService} from '../postCommentService';
import {PostComment} from '@domain/PostComment/entities';
import {MutationOptions, useMutation} from '@infra/hooks/useMutation';
export function usePostCommentCreate(
  postId: number,
  options?: MutationOptions<PostComment>,
) {
  const {loading, mutate, error} = useMutation<{message: string}, PostComment>(
    ({message}) => postCommentService.create(postId, message),
    options,
  );
  async function createComment(message: string) {
    await mutate({message});
  }
  return {
    createComment,
    loading,
    error,
  };
}
