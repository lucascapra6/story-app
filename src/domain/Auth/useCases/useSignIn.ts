import {MutationOptions} from '@infra/hooks/useMutation';
import {useMutation} from '@tanstack/react-query';
import {AuthCredentials} from '@domain/Auth/entities';
import {authService} from '@domain/Auth/authService';
import {useAuthCredentials} from '@appservices/AuthCredentials/useAuthCredetentials';

interface Variables {
  email: string;
  password: string;
}
export function useAuthSignIn(options?: MutationOptions<AuthCredentials>) {
  const {saveCredentials} = useAuthCredentials();
  const mutation = useMutation<AuthCredentials, Error, Variables>({
    mutationFn: ({email, password}) => authService.signIn(email, password),
    retry: false,
    onSuccess: data => {
      saveCredentials(data);
    },
    onError: error => {
      if (options?.onError) {
        options.onError(error.message);
      }
    },
  });
  return {
    isLoading: mutation.isLoading,
    signIn: (variables: Variables) => mutation.mutate(variables),
  };
}
