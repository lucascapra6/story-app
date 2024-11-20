import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://127.0.0.1:3333/',
  headers: {
    Authorization:
      'Bearer MQ.kkOirs8uzCvkv4yeeU6bl4xOWRCjzs3LsJxzwQlmYAaMdu8Kun48kpfaTHCt',
  },
});
