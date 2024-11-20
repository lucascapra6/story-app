import {postCommentService} from '../postCommentService';
import {PostComment} from '@domain/PostComment/entities';
import {MutationOptions} from '@infra/hooks/useMutation';
import {useQueryClient, useMutation} from '@tanstack/react-query';
import {QueryKeys} from '@infra/react-query/types';
export function usePostCommentCreate(
  postId: number,
  options?: MutationOptions<PostComment>,
) {
  const queryClient = useQueryClient();
  const {mutate, isLoading, isError} = useMutation<
    PostComment,
    unknown,
    {message: string}
  >({
    mutationFn: variables =>
      postCommentService.create(postId, variables.message),
    onSuccess: data => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.PostCommentList, postId],
      });
      if (options?.onSuccess) {
        options.onSuccess(data);
      }
    },
    onError: () => {
      if (options?.onError) {
        options.onError(options?.errorMessage || 'ocorreu um erro');
      }
    },
  });
  function createComment(message: string) {
    mutate({message});
  }
  return {
    createComment,
    isLoading,
    isError,
  };
}
