// 第三方库：axios-extensions 
const requestKeyMap = new Map();

// 根据请求地址，方式，参数生成key
function generateRequestKey(config) {
  const { method, url, params, data } = config;
  return [method, url, Qs.stringify(params), Qs.stringify(data)].join('&');
}

function add(config) {
  const key = generateRequestKey(config);
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken((cancel) => {
      if (!requestKeyMap.has(key)) {
        requestKeyMap.set(key, cancel);
      }
    });
}

function remove(config) {
  const key = generateRequestKey(config);
  if (requestKeyMap.has(key)) {
    const cancelToken = requestKeyMap.get(key);
    cancelToken(key);
    requestKeyMap.delete(key);
  }
}

axios.interceptors.request.use(function (config) {
  return config;
});

axios.interceptors.request.use(function (config) {
  // console.log(key)
  remove(config);
  add(config);
  return config;
});

axios.interceptors.response.use(
  function (result) {
    remove(result.config);
    // console.log(key)
    return result;
  },
  (error) => {
    remove(error.config || {});
    if (axios.isCancel(error)) {
      console.log('self cancel');
    } else {
      // 异常处理
    }
    return Promise.reject(error);
  }
);

// let cancel;
// const cancelToken = new axios.CancelToken((c) => {
//   cancel = c;
// });
// const source = CancelToken.source();
// source.cancel('self cancel')

btn.onclick = function () {
  axios
    .get('/get/server', {
      // cancelToken,
      params: {
        // a: 1,
        // b: 2
      },
    })
    .then((res) => console.log('result', res))
    .catch(function (thrown) {
      if (axios.isCancel(thrown)) {
        console.log(thrown);
      } else {
        // handle error
        console.log('error', thrown);
      }
    });
};
