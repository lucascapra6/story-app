import {postService} from '@domain/Post/postService';
import {usePaginatedList} from '@components/PaginatedList/usePaginatedList';

export function usePostList() {
  return usePaginatedList(postService.getList);
}
