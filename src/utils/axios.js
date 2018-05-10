/**
 * Date              Author           Des
 *----------------------------------------------
 * 18-3-22           gongtiexin       axios的封装和拦截器
 * */

import axios from "axios";
import { notification } from "antd";

axios.defaults.retry = 4;
axios.defaults.retryDelay = 1000;

/**
 * axios拦截器
 */
axios.interceptors.response.use(
  response => Promise.resolve(response),
  error => {
    const { config } = error;
    // If config does not exist or the retry option is not set, reject
    if (!config || !config.retry) return Promise.reject(error);

    // Set the variable for keeping track of the retry count
    config.retryCount = config.retryCount || 0;

    // Check if we've maxed out the total number of retries
    if (config.retryCount >= config.retry) {
      if (error.response) {
        switch (error.response.status) {
          case 401: {
            // TODO
            break;
          }
          default:
            break;
        }
      }
      // Reject with the error
      return Promise.reject(error);
    }

    // Increase the retry count
    config.retryCount += 1;

    // Create new promise to handle exponential backoff
    const backoff = new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, config.retryDelay || 1);
    });

    // Return the promise in which recalls axios to retry the request
    return backoff.then(() => axios(config));
  }
);

// axios.interceptors.response.use(
//   response => Promise.resolve(response),
//   error => {
//     if (error.response) {
//       switch (error.response.status) {
//         case 401: {
//           // TODO
//           break;
//         }
//         case 403: {
//           notification.warn({ message: "您没有权限这样做!" });
//           break;
//         }
//         default:
//           break;
//       }
//     }
//     return Promise.reject(error);
//   }
// );

/**
 * ajax请求同意封装
 *
 * @param    {Object}  config     axios请求配置
 * @param    {Object}  success    请求成功配置
 * @param    {Object}  error      请求失败配置
 * @return   {Promise} response   ajax请求结果
 *
 * @date     18-3-22
 * @author   gongtiexin
 */
const request = (config, success, error) =>
  axios(config).then(
    response => {
      const {
        data: { errCode, errMsg = "error" },
      } = response;
      if (errCode && errCode !== 0) {
        const newError = new Error();
        newError.errCode = errCode;
        newError.errMsg = errMsg;
        newError.data = response;
        return Promise.reject(newError);
      }
      if (success && success.message) {
        notification.success({ message: success.message });
      }
      return Promise.resolve(response);
    },
    ({ response }) => {
      const newConfig = {};
      switch (response.status) {
        case 403: {
          newConfig.description = "您没有权限这样做";
          break;
        }
        case 503: {
          newConfig.description = "服务器当前无法处理请求";
          break;
        }
        case 502: {
          newConfig.description = "服务器接暂无响应";
          break;
        }
        default: {
          if (response && response.data && response.data.errMsg) {
            newConfig.description = response.data.errMsg;
          }
        }
      }
      if (error && error.message) {
        newConfig.message = error.message;
        notification.error(newConfig);
      }
      return Promise.reject(response);
    }
  );

export default request;
