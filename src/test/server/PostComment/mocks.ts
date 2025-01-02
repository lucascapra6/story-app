import {PostCommentAPI} from '@domain/PostComment/entities';
import {PageApi} from '@api/types';
import {userAdapter} from '@domain/User/userAdapter';
import {AuthCredentials} from '@domain/Auth/entities';
import {UserAPI} from '@domain/User/entities';
const POST_ID = 1;

export const postCommentAPI: PostCommentAPI = {
  id: 97,
  message: 'comentário aleatório',
  user_id: 4,
  post_id: POST_ID,
  created_at: '2023-10-18T22:19:17.000+00:00',
  updated_at: '2023-10-21T07:46:21.821+00:00',
  user: {
    id: 4,
    first_name: 'Marcelo',
    last_name: 'Tavares',
    username: 'celotavares',
    email: 'celotavares@coffstack.com',

    profile_url:
      'https://nubble-development.s3.sa-east-1.amazonaws.com/backend-integration/6-marcelo.png',
    is_online: false,
    full_name: 'Marcelo Tavares',
  },

  meta: {},
};

const mateusUserAPI: UserAPI = {
  id: 7,
  first_name: 'Mateus',
  last_name: 'de Souza',
  username: 'mateussouza',
  email: 'msouza@coffstack.com',
  profile_url:
    'https://nubble-development.s3.sa-east-1.amazonaws.com/backend-integration/8-mateus.png',
  is_online: false,
  full_name: 'Mateus de Souza',
};

export const mateusAuthCredentials: AuthCredentials = {
  token: 'access-token',
  tokenExpiresAt: '2030-10-07T12:08:50.433+00:00',
  refreshToken: 'refresh-token',
  user: userAdapter.toUser(mateusUserAPI),
};

export const mateusPostCommentAPI: PostCommentAPI = {
  id: 113,
  message: 'Iure bene angelus.',
  user_id: 7,
  post_id: POST_ID,
  created_at: '2023-10-20T10:26:18.000+00:00',
  updated_at: '2023-10-21T07:46:21.828+00:00',
  user: mateusUserAPI,
  meta: {},
};

const mockedPostCommentResponse: PageApi<PostCommentAPI[]> = {
  meta: {
    total: 1,
    per_page: 10,
    current_page: 1,
    last_page: 1,
    first_page: 1,
    first_page_url: '/?page=1',
    last_page_url: '/?page=1',
    next_page_url: null,
    previous_page_url: null,
  },
  data: [postCommentAPI, mateusPostCommentAPI],
};
export const mockedPostComment = {
  POST_ID,
  mockedPostCommentResponse,
  mateusAuthCredentials,
  mateusPostCommentAPI,
};
