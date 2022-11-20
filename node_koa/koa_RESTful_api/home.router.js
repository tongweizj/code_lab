const Router = require('koa-router');

const router = new Router({
  prefix:'/home'
});

router.get('/world', ctx=> {
  ctx.body = 'Hello world!';
});

router.post('/', ctx=> {
  ctx.body = 'Hello world!';
});


module.exports = router;