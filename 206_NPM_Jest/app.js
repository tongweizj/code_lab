const http = require('./http');

var uri = 'http://178.128.226.70:20000/subscription';
var params = {
  data: {
    eaid: '111111111',
    cameraUuid: '1-3',
  },
};
http(uri, params).then((res) => {
  console.log('res.response');
  console.log(res.data.EAID);
});
