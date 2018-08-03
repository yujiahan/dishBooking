'use strict';

const Controller = require('egg').Controller;
let moment = require('moment')


class ImportController extends Controller {
  async busData() {
    
    var  importData = this.ctx.request.body;
    var  dateLen = importData.data.bData.length;
    
    for( let idx = 0; idx < dateLen; idx++) {
        var insertTime  = moment(importData.data.bData[idx][0]).format("YY-MM-DD HH:MM:SS");
        var insertdata  = importData.data.bData[idx][1].join(",");
        const results = await this.app.mysql.query('INSERT INTO perfmWaiter (Date, BData) VALUES ("'+ insertTime + '","' + insertdata+ 
        '") ON DUPLICATE KEY UPDATE BData=("'+ insertdata +'")');
    }
    

  }
}

module.exports = ImportController;
