import { createFetch } from 'ofetch';

export const client = createFetch({
  defaults: {
    baseURL: 'https://jsonplaceholder.typicode.com',
  },
});
