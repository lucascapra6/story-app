import {MutationOptions, useMutation} from '@tanstack/react-query';
import {AuthCredentials} from '@domain/Auth/entities';
import {authService} from '@domain/Auth/authService';

interface Variables {
  email: string;
  password: string;
}
export function useAuthSignIn(options?: MutationOptions<AuthCredentials>) {
  const mutation = useMutation<AuthCredentials, Error, Variables>({
    mutationFn: ({email, password}) => authService.signIn(email, password),
    retry: false,
    onError: error => {
      if (options?.onError) {
        options.onError(error.message, undefined, undefined);
      }
    },
  });
  return {
    isLoading: mutation.isLoading,
    signIn: (variables: Variables) => mutation.mutate(variables),
  };
}
