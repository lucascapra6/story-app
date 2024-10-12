import {usePaginatedList} from '@components/PaginatedList/usePaginatedList';
import {PostComment} from '@domain/PostComment/entities';
import {postCommentService} from '@domain/PostComment/postCommentService';

export function usePostCommentList(postId: number) {
  function getList(page: number) {
    return postCommentService.getList(postId, page);
  }
  return usePaginatedList(getList);
}
