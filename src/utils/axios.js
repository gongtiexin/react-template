import axios from 'axios';

const requestOnFulfilledFunc = (request) => {
  return Promise.resolve(request);
};

const requestOnRejectedFunc = (error) => {
  return Promise.reject(error);
};

const responseOnFulfilledFunc = (response) => {
  return Promise.resolve(response.data?.data || {});
};

const responseOnRejectedFunc = (error) => {
  return Promise.reject(error);
};

const interceptorsContext = {
  default: {
    requestOnFulfilledFunc,
    requestOnRejectedFunc,
    responseOnFulfilledFunc,
    responseOnRejectedFunc,
  },
};

const interceptorsRegister = (instance, model = 'default') => {
  instance.interceptors.request.use(
    interceptorsContext[model].requestOnFulfilledFunc,
    interceptorsContext[model].requestOnRejectedFunc
  );
  instance.interceptors.response.use(
    interceptorsContext[model].responseOnFulfilledFunc,
    interceptorsContext[model].responseOnRejectedFunc
  );
};

const axiosInstance = axios.create();

interceptorsRegister(axiosInstance);

export default axiosInstance;
