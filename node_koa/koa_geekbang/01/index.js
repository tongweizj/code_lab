const koa = require('koa')
const fs = require('fs')
const path = require('path')
const mount = require('koa-mount')
const staticF = require('koa-static')

const app = new koa()
const staticPath = './source'
app.use(
  staticF(path.join(__dirname, staticPath))    // <link href="/static/main.css" rel="stylesheet"> 在使用的时候,写出 source 以下的相对目录
)
console.log(path.join(__dirname, staticPath))
app.use(
  mount('/', async (ctx) => {
    ctx.body = fs.readFileSync(__dirname + '/source/index.htm', 'utf-8')
  })
)

app.listen(3000);