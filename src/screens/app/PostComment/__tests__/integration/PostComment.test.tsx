import React from 'react';
import {
  renderScreen,
  waitFor,
  screen,
  fireEvent,
  act,
} from '../../../../../test/test-utils';
import {PostCommentScreen} from '@screens/app/PostComment';
import {postCommentAdapter} from '@domain/PostComment/postCommentAdapter';
import {mockedPostComment} from '../../../../../test/server/PostComment/mocks';
import {server} from '../../../../../test/server/server';
import {authCredentialsStorage} from '@appservices/AuthCredentials/authCredentialsStorage';
import {Alert, AlertButton} from 'react-native';
import {waitForElementToBeRemoved} from '@testing-library/react-native';
import {resetInMemoryResponse} from '../../../../../test/server/PostComment/postCommentHandlers';

beforeAll(() => {
  server.listen();
  jest.useFakeTimers();
});

afterEach(() => {
  server.resetHandlers();
  resetInMemoryResponse();
});

afterAll(() => {
  server.close();
  jest.useRealTimers();
});
// jest.mock('@appservices/AuthCredentials/useAuthCredetentials', () => ({
//   useAuthCredentials: jest.fn(),
// }));
describe('integration: PostCommentScreen', () => {
  // const mockUseAuthCredentials = jest.mocked(useAuthCredentials);
  // beforeEach(() => {
  //   mockUseAuthCredentials.mockReturnValue({userId: 7}); // Configura o mock
  // });

  test('Should list the items from PostCommentAPI', async () => {
    // jest
    //   .spyOn(postCommentApi, 'getList')
    //   .mockResolvedValue(mockedData.mockedPostCommentResponse);
    const {getByTestId} = renderScreen(
      <PostCommentScreen
        navigation={{} as any}
        route={{
          name: 'PostComment',
          key: 'PostComment',
          params: {
            postId: 1,
            postAuthorId: 1,
          },
        }}
      />,
    );
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const list = getByTestId('post-comment-list');
    await waitFor(() => {
      expect(list.props.data).toStrictEqual(
        mockedPostComment.mockedPostCommentResponse.data.map(
          postCommentAdapter.toPostComment,
        ),
      );
    });
  });

  // with MSW
  test('When ADDING a comment the list is automatically updated', async () => {
    renderScreen(
      <PostCommentScreen
        navigation={{} as any}
        route={{
          name: 'PostComment',
          key: 'PostComment',
          params: {
            postId: 1,
            postAuthorId: 1,
          },
        }}
      />,
    );

    const comment = await screen.findByText(/comentário aleatório/i);
    expect(comment).toBeTruthy();

    // achar o campo de input
    const inputText = screen.getByPlaceholderText(/Adicione um comentário/i);

    // digitar a mensagem
    fireEvent.changeText(inputText, 'novo comentário');

    // clicar em enviar
    fireEvent.press(screen.getByText(/Enviar/i));

    //espera: a lista atualizada com o novo comentário
    const newComment = await screen.findByText(/novo comentário/i);

    expect(newComment).toBeTruthy();

    const comments = await screen.findAllByTestId('post-comment-id');

    expect(comments.length).toBe(3);
  });

  test('Should delete the comment when the user is its owner, showing then unshowing alert', async () => {
    jest
      .spyOn(authCredentialsStorage, 'get')
      .mockResolvedValue(mockedPostComment.mateusAuthCredentials);

    let confirmButtonMocked: AlertButton['onPress'];
    jest.spyOn(Alert, 'alert').mockImplementation((title, message, buttons) => {
      if (buttons) {
        confirmButtonMocked = buttons[0].onPress;
      }
    });
    renderScreen(
      <PostCommentScreen
        navigation={{} as any}
        route={{
          name: 'PostComment',
          key: 'PostComment',
          params: {
            postId: 1,
            postAuthorId: 1,
          },
        }}
      />,
    );

    const comment = await screen.findByText(
      mockedPostComment.mateusPostCommentAPI.message,
      {exact: false},
    );
    fireEvent(comment, 'longPress');

    confirmButtonMocked && confirmButtonMocked();

    await waitForElementToBeRemoved(() =>
      // eslint-disable-next-line testing-library/prefer-query-by-disappearance
      screen.getByText(mockedPostComment.mateusPostCommentAPI.message, {
        exact: false,
      }),
    );
    const comments = await screen.findAllByTestId('post-comment-id');
    expect(comments.length).toBe(1);

    await waitFor(() => {
      // eslint-disable-next-line testing-library/await-async-queries
      expect(screen.findByTestId('toast-message')).toBeTruthy();
    });

    act(() => jest.runAllTimers());

    await waitFor(() => {
      expect(screen.queryByTestId('toast-message')).toBeNull();
    });
  });
});
