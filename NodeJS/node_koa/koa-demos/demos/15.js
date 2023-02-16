const Koa = require('koa');
const app = new Koa();

const handler = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.response.status = err.statusCode || err.status || 500 || 404;
    ctx.response.body = {
      message: err.message
    };
  }
};

const main = ctx => {
  ctx.response.status = 404;
  // ctx.response.body = 'Page Not Found';
};

app.use(handler);
app.use(main);
app.listen(3000);
