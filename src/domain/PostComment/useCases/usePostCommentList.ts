import {usePaginatedList} from '@components/PaginatedList/usePaginatedList';
import {postCommentService} from '@domain/PostComment/postCommentService';
import {QueryKeys} from '@infra/react-query/types';

export function usePostCommentList(postId: number) {
  function getList(page: number) {
    return postCommentService.getList(postId, page);
  }
  return usePaginatedList([QueryKeys.PostCommentList, postId], getList);
}
