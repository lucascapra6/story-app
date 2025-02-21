import {apiAdapter} from '@api/apiAdapter';
// @ts-ignore
import {Page} from '@types/Pages';

import {postCommentAdapter} from './postCommentAdapter';
import {postCommentApi} from './postCommentApi';
import {PostComment} from '@domain/PostComment/entities';

const PER_PAGE = 10;
async function getList(
  postId: number,
  page: number,
): Promise<Page<PostComment>> {
  const postCommentPageAPI = await postCommentApi.getList(postId, {
    page,
    per_page: PER_PAGE,
  });

  return apiAdapter.toPageModel(
    postCommentPageAPI,
    postCommentAdapter.toPostComment,
  );
  // return {
  //   meta: apiAdapter.toMetaDataPage(postCommentPageAPI.meta),
  //   data: postCommentPageAPI.data.map(postCommentAdapter.toPostComment),
  // };
}
async function create(postId: number, message: string): Promise<PostComment> {
  const postCommentAPI = await postCommentApi.create(postId, message);
  return postCommentAdapter.toPostComment(postCommentAPI);
}

async function remove(postCommentId: number): Promise<string> {
  const response = await postCommentApi.remove(postCommentId);
  return response.message;
}
/**
 * @description user can delete the comment if it is the post author or comment author
 *
 * @param postComment comment to be deleted
 * @param userId the current session user id
 * @param postAuthorId the id of the post author
 */
function isAllowToDelete(
  postComment: PostComment,
  userId: number | null,
  postAuthorId: number,
): boolean {
  if (postComment.author.id === userId) {
    return true;
  }

  return postAuthorId === userId;
}
export const postCommentService = {
  getList,
  create,
  remove,
  isAllowToDelete,
};
