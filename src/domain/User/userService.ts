import {userApi} from '@domain/User/userApi';
import {User} from '@domain/User/entities';
import {userAdapter} from '@domain/User/userAdapter';

async function getById(id: number): Promise<User> {
  const userAPI = await userApi.getById(id.toString());
  return userAdapter.toUser(userAPI);
}

export const userService = {
  getById,
};
