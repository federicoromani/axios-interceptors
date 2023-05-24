import axios from 'axios';
import { toastMessageStore, loaderStore } from "@/stores/ui.store";
import { toRefs } from 'vue';

const { titleMessage, message, typeMessage, show } = toRefs(toastMessageStore);
const env = import.meta.env;

const api = axios.create({
  baseURL: env.VITE_API_URL,
  headers: {
    Accept: `application/json;`,
    'Content-Type': 'application/json;charset=UTF-8'
  }
});

api.interceptors.request.use(function (config) { 
  loaderStore.show = true;
  // config.headers.Authorization = `Bearer ${getStorage('token')}`;
  return config;
}, function (error) {
  loaderStore.show = false;
  if (error.request) {
    if(import.meta.env.DEV) console.log('request', error.request);
  } else {
    if (import.meta.env.DEV) console.log('Error', error.message);
  }
  if(import.meta.env.DEV) console.log('config', error.config);
  return Promise.reject(error);
});

api.interceptors.response.use(function (response) {
  loaderStore.show = false;
  titleMessage.value = 'Success'
  message.value = 'Not Errors'
  typeMessage.value = 'success'
  show.value = true
  return response;
}, function (error) {
  loaderStore.show = false;
  if (error.response?.data) {
    titleMessage.value = error.response?.status ? `Error #${error.response.status}` : ''
    message.value = error.response.data.message
    typeMessage.value = 'danger'
    show.value = true
  } else {
    if (import.meta.env.DEV) console.log('error.message', error.message);
  }
  return Promise.reject(error);
});

export {
  api
}
