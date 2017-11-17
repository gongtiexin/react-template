import axios from 'axios';
import { createBrowserHistory } from 'history';
import { notification } from 'antd';

const history = createBrowserHistory();

axios.default.timeout = 5000;

axios.interceptors.response.use(
  response => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401: {
          if (!history.location.pathname.startsWith('/signon')) {
            const { location: { search } } = history;
            // history.push(`/signon${search}`);
            window.location.href = `/signon${search}`;
          }
          break;
        }
        case 403: {
          notification.warn({ message: '您没有权限这样做!' });
          break;
        }
        default:
          break;
      }
    }
    return Promise.reject(error);
  },
);

export default function request(config, success, error) {
  return axios(config)
    .then((response) => {
      const { data: { errCode, errMsg = 'error' } } = response;
      if (errCode && errCode !== 0) {
        const newError = new Error();
        newError.errCode = errCode;
        newError.errMsg = errMsg;
        newError.data = response;
        Promise.reject(newError);
      }
      if (notification !== null && success && success.message) {
        notification.success({ message: success.message });
      }
      return response;
    })
    .catch((e) => {
      const { response } = e;
      const newConfig = {};
      if (response && response.data && response.data.errMsg) {
        newConfig.description = e.response.data.errMsg;
      }
      if (notification !== null && error && error.message) {
        newConfig.message = error.message;
        notification.error(newConfig);
      }
      Promise.reject(e);
      return response;
    });
}