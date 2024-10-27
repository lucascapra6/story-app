import {PageParams} from '@api/types';
import {PageApi} from '@api/types';
import {PostCommentAPI} from '@domain/PostComment/entities';
import {api} from '@api/apiConfig';
const PATH = 'user/post_comment';
async function getList(
  post_id: number,
  pageParams?: PageParams,
): Promise<PageApi<PostCommentAPI[]>> {
  const response = await api.get<PageApi<PostCommentAPI[]>>(PATH, {
    params: {
      post_id,
      ...pageParams,
    },
  });
  return response.data;
}

async function create(
  post_id: number,
  message: string,
): Promise<PostCommentAPI> {
  const response = await api.post<PostCommentAPI>(PATH, {
    post_id,
    message,
  });
  return response.data;
}

async function remove(postCommentId: number): Promise<{message: string}> {
  const response = await api.delete<{message: string}>(
    `${PATH}/${postCommentId}`,
  );

  return response.data;
}
export const postCommentApi = {
  getList,
  create,
  remove,
};
