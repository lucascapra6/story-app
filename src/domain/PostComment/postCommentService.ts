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

  return {
    data: postCommentPageAPI.data.map(postCommentAdapter.toPostComment),
    meta: apiAdapter.toMetaDataPage(postCommentPageAPI.meta),
  };
}

export const postCommentService = {
  getList,
};