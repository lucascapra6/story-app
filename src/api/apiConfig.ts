import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://127.0.0.1:3333/',
  headers: {
    Authorization:
      'Bearer MQ.QjTRA2DmF4vU68XuyKI1NCytuJCPu6UwEG5rn9f5hYn5_E9dNxW4g9rdYKy3',
  },
});
