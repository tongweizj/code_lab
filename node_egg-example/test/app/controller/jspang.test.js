
'use strict';

const { app } = require('egg-mock/bootstrap');

describe('test/app/controller/jspang.test.js', () => {

  it('jspang getGirls', async () => {
    await app.httpRequest()
      .get('/getGirls')
      .expect(200)
      .expect('<h1>杨幂，正在向你走来</h1>');
  });
});
