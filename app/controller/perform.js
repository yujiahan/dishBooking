'use strict';

const Controller = require('egg').Controller;


class ImportController extends Controller {
  async getAllData() {
    
    this.ctx.body = await this.app.mysql.select('perfmWaiter');
  }
  async saveTodayConsume () {
    var  chefConsume = this.ctx.request.body;
  }
}

module.exports = ImportController;
