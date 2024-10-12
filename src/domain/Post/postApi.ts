import {PostApi} from '@domain/Post/entities';
import {PageApi, PageParams} from '@api/types';
import {api} from '@api/apiConfig';

async function getList(params?: PageParams): Promise<PageApi<PostApi[]>> {
  //TODO: simular um delay na API
  const response = await api.get<PageApi<PostApi[]>>('user/post', {
    params,
  });
  return response.data;
}

export const postApi = {
  getList,
};
