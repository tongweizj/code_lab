'use strict';

const { Controller } = require('egg');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    console.log(ctx.session.counter);
    ctx.body = 'Hello World';
  }

  async jspang() {
    const { ctx } = this;
    ctx.body = '<h1>Hello JSPang</h1>';
  }
}

module.exports = HomeController;
