import {UserAPI} from '@domain/User/entities';
import {api} from '@api/apiConfig';

const PATH = 'users';

async function getById(userId: string): Promise<UserAPI> {
  const response = await api.get<UserAPI>(`${PATH}/${userId}`);
  return response.data;
}

export const userApi = {
  getById,
};
