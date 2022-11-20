const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const homeRouters = require('./home.router')

const app = new Koa();
app.use(bodyParser());
app.use(homeRouters.route());
app.listen(3000);
