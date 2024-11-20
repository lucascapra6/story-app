import {userService} from '@domain/User/userService';
import {useQuery} from '@tanstack/react-query';
import {QueryKeys} from '@infra/react-query/types';

export function useUserGetById(id: number) {
  const {data, isLoading, isError} = useQuery({
    queryKey: [QueryKeys.UserGetById, id],
    queryFn: () => userService.getById(id),
    staleTime: 10000,
  });

  return {
    user: data,
    isLoading,
    isError,
  };
}
