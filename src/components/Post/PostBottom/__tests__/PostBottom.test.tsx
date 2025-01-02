import React from 'react';
import {render} from '../../../../test/test-utils';
import {PostBottom} from '@components/Post/PostBottom';
import {fireEvent, screen} from '@testing-library/react-native';
import {mockedPost} from '@components/Post/__tests__/mockedData/mockedPost';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  const originalModule = jest.requireActual('@react-navigation/native');
  return {
    ...originalModule,
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});
describe('PostBottom', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Render Component', () => {
    render(<PostBottom {...mockedPost} />);
  });

  it('navigates to PostCommentScreen when pressing the comment link', () => {
    render(<PostBottom {...mockedPost} commentCount={4} />);

    const commentLinkElement = screen.getByText(/comentário/);

    fireEvent.press(commentLinkElement);

    expect(mockedNavigate).toHaveBeenCalledWith('PostComment', {
      postId: mockedPost.id,
      postAuthorId: mockedPost.author.id,
    });
  });
});
