

import axios from 'axios';
import { Loading, Message } from 'element-ui';
import { getToken } from './utils/auth.js';


function startLoading() {
  loading = Loading.service({
    lock: true,
    text: "加载中...",
    background: "rgba(0, 0, 0, 0.7)"
  });
}

function endLoading() {
  loading.close();
}


const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 1. 区分环境
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // 2. 超时时间
  // other config... examples: headers  3. 其他信息（headers，cookies）
});

request.interceptors.request.use(function (config) {
  startLoading();
  const token = getToken();
  if(token) {
    config.headers['token'] = token;
  } 
  return config;
}, error => {
  console.log('request error:', error);
  return Promise.reject(error);
});

// 4. 响应结果处理
request.interceptors.response.use(function (response) {
  endLoading();
  const res = response.data;
  if (res.code !== '200') {
    if (res.code == '5xx') {
      Message.error('服务器错误');
    } else if (res.code == '4xx') {
      router.push({ path: '/404' });
    } else {
      Message.error(res.message);
    }
    return Promise.reject(new Error(res.message || 'Error'))
  } else {
    return Promsie.resolve(res);
  }
}, error => {
  endLoading();
  console.log('response error:', error);
  Message({
    message: error.message,
    type: 'error',
    duration: 5 * 1000
  })
  return Promise.reject(error)
});

export default request;