'use strict';

const { Controller } = require('egg');

class JspangController extends Controller {

  async jspang() {
    const { ctx } = this;
    ctx.body = '<h1>Hello JSPang</h1>';
  }

  async getGirls() {
    const { ctx } = this;

    await new Promise(resolve => {
      setTimeout(() => {
        resolve(ctx.body = '<h1>杨幂，正在向你走来</h1>');
      }, 5000);
    });

  }

  async getGirl() {
    const { ctx } = this;
    ctx.body = ctx.query;

  }
}

module.exports = JspangController;
