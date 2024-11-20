import {postService} from '@domain/Post/postService';
import {usePaginatedList} from '@components/PaginatedList/usePaginatedList';
import {QueryKeys} from '@infra/react-query/types';

export function usePostList() {
  return usePaginatedList([QueryKeys.PostList], postService.getList);
}
