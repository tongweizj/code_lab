const axios = require('axios');

// async function http(uri, params) {
//   return new Promise((resolve) => {
//     // console.log(uri);
//     // console.log(params);
//     axios
//       .post(uri, params)
//       .then(function (response) {
//         // console.log(response);
//         resolve(response);
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   });
// }

async function http(uri, params) {
  return new Promise((resolve) => {
    // console.log(uri);
    // console.log(params);
    axios
      .post(uri, params)
      .then(function (response) {
        // console.log(response);
        resolve(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  });
}

module.exports = http;
