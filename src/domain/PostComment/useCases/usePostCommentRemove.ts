import {MutationOptions} from '@infra/hooks/useMutation';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {postCommentService} from '@domain/PostComment/postCommentService';
import {QueryKeys} from '@infra/react-query/types';

export function usePostCommentRemove(
  postId: number,
  option?: MutationOptions<string>,
) {
  const queryClient = useQueryClient();
  const mutation = useMutation<string, unknown, {postCommentId: number}>({
    mutationFn: ({postCommentId}) => postCommentService.remove(postCommentId),
    onSuccess: data => {
      queryClient.invalidateQueries([QueryKeys.PostCommentList, postId]);
      if (option?.onSuccess) {
        option.onSuccess(data);
      }
    },
  });
  // return useMutation<{postCommentId: number}, string>(
  //   ({postCommentId}) => postCommentService.remove(postCommentId),
  //   option,
  // );

  return {mutate: mutation.mutate};
}
