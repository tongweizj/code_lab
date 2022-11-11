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
};
