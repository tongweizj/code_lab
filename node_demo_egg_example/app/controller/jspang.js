'use strict';

const { Controller } = require('egg');

class JspangController extends Controller {

  async jspang() {
    const { ctx } = this;
    console.log(ctx.session.counter);
    ctx.body = '<h1>Hello JSPang</h1>';
  }

  async getGirls() {
    const { ctx } = this;
    console.log(ctx.session.counter);
    await new Promise(resolve => {
      setTimeout(() => {
        resolve(ctx.body = '<h1>杨幂，正在向你走来</h1>');
      }, 5000);
    });

  }

  async getGirl() {
    // http://127.0.0.1:7001/getGirl?name=小红
    // http://127.0.0.1:7001/getGirl?name=小红&age=20
    // 通过 uir 传参
    // 在router 上没有限制传参格式,比较自由

    const { ctx } = this;
    const res = await ctx.service.jspang.getGirl('1818');
    ctx.body = res;

  }

  async getGirl2() {
    // http://127.0.0.1:7001/getGirl2/小红/20
    // 通过 uir 传参,格式 /getGirl2/:name/:age
    // 在router 限制传参格式
    const { ctx } = this;
    ctx.body = ctx.params.name;
    const name = ctx.params.name;
    const age = ctx.params.age;
    ctx.body = '大哥你好，我是' + name + ',今年' + age + '岁.欢迎光临红浪漫!';
  }

  async add() {
    const { ctx } = this;
    ctx.body = 'add';
  }

}

module.exports = JspangController;
