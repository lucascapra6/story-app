import {renderHook} from '../../../../test/test-utils';
import {AllTheProviders, waitFor, act} from '../../../../test/test-utils';

import {useAuthSignIn} from '@domain/Auth/useCases/useSignIn';
import {authService} from '@domain/Auth/authService';
import {mockedAuthCredentials} from '@domain/Auth/useCases/__tests__/mockedData/mocks';

const mockedSaveCredentials = jest.fn();
jest.mock('@appservices/AuthCredentials/useAuthCredetentials', () => {
  const originalModule = jest.requireActual(
    '@appservices/AuthCredentials/useAuthCredetentials',
  );
  return {
    ...originalModule,
    useAuthCredentials: () => ({
      saveCredentials: mockedSaveCredentials,
    }),
  };
});
describe('useAuthSignIn', () => {
  it('saves credentials if the sign-in successfully', async () => {
    jest
      .spyOn(authService, 'signIn')
      .mockResolvedValueOnce(mockedAuthCredentials);
    const {result} = renderHook(() => useAuthSignIn());
    await act(async () => {
      result.current.signIn({email: 'lucas@coffstack.com', password: '123'});
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockedSaveCredentials).toHaveBeenCalledWith(mockedAuthCredentials);
  });

  it('calls the onError function with a message if sign-in fails', async () => {
    const errorMessage = 'Falha ao logar';
    const mockedOnError = jest.fn();
    jest
      .spyOn(authService, 'signIn')
      .mockRejectedValueOnce(new Error(errorMessage));
    const {result} = renderHook(() =>
      useAuthSignIn({
        onError: mockedOnError,
      }),
    );
    await act(async () => {
      result.current.signIn({email: 'lucas@coffstack.com', password: '123'});
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(false));

    expect(mockedOnError).toHaveBeenCalledWith(errorMessage);
  });
});
