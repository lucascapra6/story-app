import {PageParams} from '@api/types';
import {PageApi} from '@api/types';
import {PostCommentAPI} from '@domain/PostComment/entities';
import {api} from '@api/apiConfig';
async function getList(
  post_id: number,
  pageParams?: PageParams,
): Promise<PageApi<PostCommentAPI[]>> {
  const response = await api.get<PageApi<PostCommentAPI[]>>(
    'user/post_comment',
    {
      params: {
        post_id,
        ...pageParams,
      },
    },
  );
  return response.data;
}

export const postCommentApi = {
  getList,
};
