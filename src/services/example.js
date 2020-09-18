import request from '@src/utils/axios';

export const query = (args) =>
  request({
    method: 'GET',
    url: '/api/query',
    params: args,
  });
