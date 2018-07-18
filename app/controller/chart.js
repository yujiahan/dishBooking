'use strict';
 let genParam   = require('../utils/genRequestParam');
 const url = "http://open.2dfire.com/router";
const Controller = require('egg').Controller;

class ChartController extends Controller {
  async getSaleDish() {
        const result = await this.app.curl(url, {
            method: 'POST',
            data: genParam('dfire.shop.day.memu.data')
        });
        this.ctx.status = result.status;
        this.ctx.set(result.headers);
        this.ctx.body = result.data;
  }
  async getOrderList() {
        const result = await this.app.curl(url, {
            method: 'POST',
            data: genParam('dfire.shop.order.list')
        });
        this.ctx.status = result.status;
        this.ctx.set(result.headers);
        this.ctx.body = result.data;
  }
  async getOrderDetailList(){
    let orderResult = await this.app.curl(url, {
        method: 'POST',
        data: genParam('dfire.shop.order.list')
    });
    
    //const orderIdList = JSON.parse(orderResult.data.toString()).model.map((order) => order.orderVo.orderId );
    const orderIdList = ["001381026489a7800164ab715f6d5952"];
    const result = await this.app.curl(url, {
        method: 'POST',
        data: genParam('dfire.shop.order.instance.list', { orderIds: orderIdList })
    });

    this.ctx.status = result.status;
    this.ctx.set(result.headers);
    this.ctx.body = result.data;
  }
}

module.exports = ChartController;
