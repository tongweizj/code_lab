# JEST 测试框架使用说明



## Demo：api 接口测试



### 1. 建项目

项目的包文件

```json
{
  "name": "web_api_test_jest",
  "version": "1.0.0",
  "description": "",
  "main": "http.js",
  "directories": {
    "test": "test"
  },
  "dependencies": {
    "axios": "^0.21.1",
    "jest": "^26.6.3"   // 安装包
  },
  "devDependencies": {},
  "jest":{              // jest配置文件，主要是告诉 jest 当前的测试环境
    "testEnvironment": "node"
  },
  "scripts": {
    "test": "jest"
  },
  "author": "",
  "license": "ISC"
}

```



### 2. 被测试的代码

```js
const axios = require('axios');
/// 简单封装了 axios 的 post 方法
async function http(uri, params) {
  return new Promise((resolve) => {
    axios
      .post(uri, params)
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  });
}

module.exports = http;

```



### 3. 测试代码

目录

`./__tests__/test.js`



```js
const http = require('../http'); //导入被测试代码

test('test1', () => {
  var uri = 'http://178.128.226.70:20000/subscription';
  var params = {
    data: {
      eaid: '111111111',
      cameraUuid: '1-3',
    },
  };
  // 异步测试
  return http(uri, params).then((res) => {
    expect(res.data.EAID).toBe('111111111'); // expect("想要测试的值").toBe('期待的结果'); 
  });
});

```



### 4. 补充说明

因为 API 接口的调用，往往是异步的，所以在一定要使用异步方法。

例如 promise、asycn 等，这些具体的写法在 jest 文档中都有详细的 demo

# 资源



[官网](https://jestjs.io/docs/zh-Hans/getting-started)

