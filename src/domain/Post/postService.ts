import {postApi} from '@domain/Post/postApi';
import {Post} from '@domain/Post/entities';
import {postAdapter} from '@domain/Post/postAdapter';
import {apiAdapter} from '@api/apiAdapter';
// @ts-ignore
import {Page} from '@types/Pages';

async function getList(page: number): Promise<Page<Post>> {
  const postApiList = await postApi.getList({page: page, per_page: 5});
  return {
    data: postApiList.data.map(postAdapter.toPost),
    meta: apiAdapter.toMetaDataPage(postApiList.meta),
  };
}

export const postService = {
  getList,
};
