const http = require('../http');

test('test1', () => {
  // var uri = 'http://178.128.226.70:20000/subscription';
  // var params = {
  //   data: {
  //     eaid: '111111111',
  //     cameraUuid: '1-3',
  //   },
  // };
  return http('http://178.128.226.70:20000/subscription', {
    data: {
      eaid: '111111111',
      cameraUuid: '1-3',
    },
  }).then((res) => {
    // console.log(res.data);
    // console.log('res.response');
    expect(res.data.EAID).toBe('111111111');
  });
});
