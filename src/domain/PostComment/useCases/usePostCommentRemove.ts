import {MutationOptions, useMutation} from '@infra/hooks/useMutation';
import {postCommentService} from '@domain/PostComment/postCommentService';

export function usePostCommentRemove(option?: MutationOptions<string>) {
  return useMutation<{postCommentId: number}, string>(
    ({postCommentId}) => postCommentService.remove(postCommentId),
    option,
  );
}
