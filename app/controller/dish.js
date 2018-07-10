'use strict';

const Controller = require('egg').Controller;

class DishController extends Controller {
  async getAll() {
    this.ctx.body = await this.app.mysql.select('alldish');
  }
}

module.exports = DishController;
