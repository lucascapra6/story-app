import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://127.0.0.1:3333/',
  headers: {
    Authorization:
      'Bearer Mg.3ryQarlROkRbWhecjqxE3DpyKWXuG6kYzB-aKJZ3ZuA7xVsMkLnKSg0TTNuy',
  },
});
