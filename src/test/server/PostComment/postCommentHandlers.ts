import {BASE_URL} from '@api/apiConfig';
import {POST_COMMENT_PATH} from '@domain/PostComment/postCommentApi';
import {PostCommentAPI} from '@domain/PostComment/entities';
import {PageApi} from '@api/types';
import {http, HttpResponse} from 'msw';
import {mockedPostComment, postCommentAPI} from './mocks';
import {cloneDeep} from 'lodash';

export let inMemoryResponse = cloneDeep(
  mockedPostComment.mockedPostCommentResponse,
);

export function resetInMemoryResponse() {
  inMemoryResponse = cloneDeep(mockedPostComment.mockedPostCommentResponse);
}
export const postCommentHandlers = [
  http.get(`${BASE_URL}${POST_COMMENT_PATH}`, async () => {
    const response: PageApi<PostCommentAPI[]> = inMemoryResponse;

    return HttpResponse.json(response, {status: 200});
  }),

  http.post<any, {postId: number; message: string}>(
    `${BASE_URL}${POST_COMMENT_PATH}`,
    async ({request}) => {
      const body = await request.json();

      const newPostCommentApi: PostCommentAPI = {
        ...postCommentAPI,
        id: 999,
        post_id: body.postId,
        message: body.message,
      };

      inMemoryResponse.data = [newPostCommentApi, ...inMemoryResponse.data];
      inMemoryResponse.meta = {
        ...inMemoryResponse.meta,
        total: inMemoryResponse.meta.total + 1,
      };
      return HttpResponse.json(newPostCommentApi, {status: 201});
    },
  ),

  http.delete<{postCommentId: string}>(
    `${BASE_URL}${POST_COMMENT_PATH}/:postCommentId`,
    async ({params}) => {
      inMemoryResponse.data = inMemoryResponse.data.filter(
        item => item.id.toString() !== params.postCommentId,
      );
      inMemoryResponse.meta = {
        ...inMemoryResponse.meta,
        total: inMemoryResponse.meta.total - 1,
      };

      return HttpResponse.json({message: 'removed'}, {status: 200});
    },
  ),
];
