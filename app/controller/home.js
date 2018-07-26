'use strict';

const Controller = require('egg').Controller;
var fs = require("fs");
var path = require("path")


class HomeController extends Controller {
  async index() {
    this.ctx.set({
      'content-type': 'text/html; charset=utf-8'
    })
    this.ctx.body = fs.readFileSync(path.join(__dirname,  '../build/index.html'));
  }
}

module.exports = HomeController;
