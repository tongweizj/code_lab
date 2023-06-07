'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/jspang', controller.jspang.jspang);
  router.get('/getGirls', controller.jspang.getGirls);
  router.get('/getGirl', controller.jspang.getGirl);
  router.get('/getGirl2/:name/:age', controller.jspang.getGirl2);
  router.post('/add', controller.jspang.add);
  // api demo:https://www.eggjs.org/zh-CN/tutorials/restful
  router.resources('topics', '/api/v2/topics', app.controller.topics);

};
