'use strict';

const Controller = require('egg').Controller;
var sha1 = require('sha1');
var moment = require('moment')

const url = "http://open.2dfire.com/router";
const APPKEY = "84f68acf4d9f54b61b6b91b7fc2fe65a";
const APPSECRET = "f98fcde8f6133fa8ea536c9e57e0ade5";

class OrderController extends Controller {
  async todayList() {
    const currentTime = new Date();
    const time = currentTime.getTime();
    const today = moment(time).format('YYYYMMDD')
    const result = await this.app.curl(url, {
        method: 'POST',
        data: {
            method: 'dfire.shop.order.instance.list',
            v: '1.0',
            timestamp: time,
            appKey: APPKEY,
            currDate: today,
            entityId: '00138102',
            sign: genSign(time, today)
        }
    });
    this.ctx.status = result.status;
    this.ctx.set(result.headers);
    this.ctx.body = result.data;
  }
}
function genSign(time, today){
    var code =`${APPSECRET}appKey${APPKEY}currDate${today}entityId00138102methoddfire.shop.order.instance.listtimestamp${time}v1.0${APPSECRET}`;
    return sha1(code).toUpperCase();
}

module.exports = OrderController;
