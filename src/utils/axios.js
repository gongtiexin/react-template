import axios from 'axios';
import { notification } from 'antd';

axios.default.timeout = 5000;

axios.interceptors.response.use(
  response => Promise.resolve(response),
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401: {
          // TODO
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

const request = (config, success, error) => axios(config)
  .then(
    (response) => {
      const { data: { errCode, errMsg = 'error' } } = response;
      if (errCode && errCode !== 0) {
        const newError = new Error();
        newError.errCode = errCode;
        newError.errMsg = errMsg;
        newError.data = response;
        Promise.reject(newError);
      }
      if (success && success.message) {
        notification.success({ message: success.message });
      }
      return response;
    },
    ({ response }) => {
      const newConfig = {};
      if (response && response.data && response.data.errMsg) {
        newConfig.description = response.data.errMsg;
      }
      if (error && error.message) {
        newConfig.message = error.message;
        notification.error(newConfig);
      }
      return response;
    },
  );

export default request;
