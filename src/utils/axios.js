import axios from 'axios';
import {notification} from 'antd';
import {createBrowserHistory} from 'history';

const history = createBrowserHistory();

axios.default.timeout = 5000;

axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      console.log('error.response', error.response);
      switch (error.response.status) {
        case 401: {
          if (error.response.config.url !== '/api/user') {
            history.push('/login');
          }
          break;
        }
      }
    }
    return Promise.reject(error)
  }
);

export function request(config, success, error) {
  return axios(config)
    .then(function (response) {
      const data = response.data;
      if (data.errCode && data.errCode !== 0) {
        if (data.errCode >= 401000 && data.errCode <= 401999) {
          console.error(response);
          return;
        }
        const error = new Error();
        error.errCode = data.errCode;
        error.errMsg = data.errMsg;
        error.data = data.data;
        return Promise.reject(error);
      }
      if (success && success.message) {
        notification.success({message: success.message})
      }
      return Promise.resolve(response)
    })
    .catch(e => {
      const config = {};
      if (e.response.data.errMsg) {
        config.description = e.response.data.errMsg;
      }
      if (error && error.message) {
        config.message = error.message;
        notification.error(config);
      }
      return Promise.reject(e)
    });

}