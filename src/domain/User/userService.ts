import {userApi} from '@domain/User/userApi';
import {User} from '@domain/User/entities';
import {userAdapter} from '@domain/User/userAdapter';
import {Page} from '@types/Pages';
import {apiAdapter} from '@api/apiAdapter';

async function getById(id: number): Promise<User> {
  const userAPI = await userApi.getById(id.toString());
  return userAdapter.toUser(userAPI);
}

async function searchUser(search: string): Promise<Page<User>> {
  const userPageAPI = await userApi.getList(search);

  return apiAdapter.toPageModel(userPageAPI, userAdapter.toUser);
}

export const userService = {
  getById,
};
