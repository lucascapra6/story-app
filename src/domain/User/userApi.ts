import {UserAPI} from '@domain/User/entities';
import {api} from '@api/apiConfig';
import {PageApi} from '@api/types';

const PATH = 'users';

async function getById(userId: string): Promise<UserAPI> {
  const response = await api.get<UserAPI>(`${PATH}/${userId}`);
  return response.data;
}

async function getList(search: string): Promise<PageApi<UserAPI>> {
  const response = await api.get<PageApi<UserAPI>>(`${PATH}`, {
    params: {search},
  });
  return response.data;
}

export const userApi = {
  getById,
  getList,
};
