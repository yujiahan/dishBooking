'use strict';

const Controller = require('egg').Controller;


class ImportController extends Controller {
  async getAllData() {
    
    this.ctx.body = await this.app.mysql.select('perfmWaiter');
  }
}

module.exports = ImportController;
