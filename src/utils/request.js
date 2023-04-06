import axios from 'axios';

let canCORS = true;

export const setCors = bool => (canCORS = bool);

export const get = url =>
  fetch(url, {
    referrer: '',
    referrerPolicy: 'no-referrer',
    mode: 'no-cors',
  }).then(r => r.json());

export const corsGet = url => fetch(`https://api.codetabs.com/v1/proxy/?quest=${url}`).then(r => r.json());

// 估计 json2jsonp 被B站拉黑了
// export const corsGet = url =>
//   fetch(`https://json2jsonp.com/?${qss({ url, callback: '_' })}`)
//     .then(r => r.text())
//     .then(jsonp => JSON.parse(jsonp.replace(/^_\((.*)\)$/, '$1')));

export const autoGet = url => (canCORS ? get(url) : corsGet(url));

//创建axios实例
const instance = axios.create({
  timeout: 6000,
});

// 请求拦截器
instance.interceptors.request.use(config => {
  if (localStorage._token) {
    config.headers.Authorization = localStorage._token;
  }
  return config;
});

//响应拦截器
instance.interceptors.response.use(
  res => {
    return res;
  },
  error => {
    // 错误状态码处理
    if (error.response) {
      let { status } = error.response;
      switch (status) {
        case 404:
          console.error(error.response.message);
          break;
        case 500:
          console.error(error.response.statusText);
          break;
      }
    }
    return Promise.reject(error);
  }
);

const http = {
  /** get 请求
   * @param  {接口地址} url
   * @param  {请求配置} config
   */
  get(url, config) {
    return new Promise((resolve, reject) => {
      instance
        .get(url, config)
        .then(response => {
          if (response) resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  /** post 请求
   * @param  {接口地址} url
   * @param  {请求数据} data
   * @param  {配置} config
   */
  post(url, data, config) {
    return new Promise((resolve, reject) => {
      instance
        .post(url, data, config)
        .then(response => {
          console.log(response);
          if (response) resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  /** delete 请求
   * @param  {接口地址} url
   * @param  {请求配置} config
   */
  delete(url, config) {
    return new Promise((resolve, reject) => {
      instance
        .delete(url, {
          data: config,
        })
        .then(response => {
          if (response) resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  /** put 请求
   * @param  {接口地址} url
   * @param  {请求配置} config
   */
  put(url, config) {
    return new Promise((resolve, reject) => {
      instance
        .put(url, config)
        .then(response => {
          if (response) resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  fetch(url, config) {
    return new Promise((resolve, reject) => {
      fetch(url, config)
        .then(response => {
          if (response) resolve(response.json());
        })
        .catch(error => {
          reject(error);
        });
    });
  },
};

export const translate = async (from, to, text, corsProxyUrl) => {
  var urlencoded = new URLSearchParams();
  urlencoded.append('text', text);
  urlencoded.append('source_lang', from);
  urlencoded.append('target_lang', to);

  var requestOptions = {
    method: 'POST',
    headers: {
      Authorization: localStorage._token,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: urlencoded,
    redirect: 'follow',
  };

  return await http.fetch(corsProxyUrl + '/https://api-free.deepl.com/v2/translate', requestOptions).then(response => {
    return response;
  });

  // return await http.post('/translate',{text:text,target_lang:to.toUpperCase()},{
  //   headers:{
  //     'Content-Type': 'application/x-www-form-urlencoded'
  //   }
  // }).then(response =>{
  //   return response.translations[0].text
  // }

  //   )
};
export default http;
