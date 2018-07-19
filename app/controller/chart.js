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
    let  orderMap = new Map();

    const orderIdList = JSON.parse(orderResult.data.toString()).model.map((order) => {
        orderMap.set(order.orderVo.orderId, {
            seatName: order.orderVo.seatName,
            receiveAmount: order.totalPayVo.receiveAmount,
            dishList: []
        })

        return order.orderVo.orderId
    });

    const requestTimes = Math.ceil(orderIdList.length /20);

    let result = [];
    let partOrderResult;

    for (let i = 0; i < requestTimes; i++) {
         let partOrderList = orderIdList.slice(i*20, (i+1)*20);
         
         partOrderResult = await this.app.curl(url, {
            method: 'POST',
            data: genParam('dfire.shop.order.instance.list', { orderIds : JSON.stringify(partOrderList)})
         });
        
         result = result.concat(JSON.parse(partOrderResult.data.toString()).model)
    }

    
    result.map((item)=>{      
        orderMap.get(item.orderId).dishList.push({
            name: item.name,
            amount: item.accountNum,
            unit: item.accountUnit
        })
    })

    let orderDetailResult = [];
    for (var key of orderMap.keys()) {
        orderDetailResult.push({
            orderId : key,
            dishList: orderMap.get(key).dishList,
            seatName: orderMap.get(key).seatName,
            receiveAmount: orderMap.get(key).receiveAmount
        })
      }
    
    this.ctx.status = partOrderResult.status;
    this.ctx.set(partOrderResult.headers);
    this.ctx.body = {data: orderDetailResult};
  }
  async getDishRank(){
    let orderResult = await this.app.curl(url, {
        method: 'POST',
        data: genParam('dfire.shop.order.list')
    });

    const orderIdList = JSON.parse(orderResult.data.toString()).model.map((order) => order.orderVo.orderId);

    const requestTimes = Math.ceil(orderIdList.length /20);

    let result = [];
    let partOrderResult;

    for (let i = 0; i < requestTimes; i++) {
         let partOrderList = orderIdList.slice(i*20, (i+1)*20);
         
         partOrderResult = await this.app.curl(url, {
            method: 'POST',
            data: genParam('dfire.shop.order.instance.list', { orderIds : JSON.stringify(partOrderList)})
         });
        
         result = result.concat(JSON.parse(partOrderResult.data.toString()).model)
    }

    var dishMap = new Map();
    result.map((item)=>{  
        if(!dishMap.has(item.menuId)){
            dishMap.set(item.menuId, {
                name: item.name,
                accountUnit: item.accountUnit,
                accountNum: 0
            })
        }
        dishMap.set(item.menuId , {          
            ...dishMap.get(item.menuId),
            accountNum: dishMap.get(item.menuId).accountNum + parseFloat(item.accountNum)
        }) 
    })

    let dishDetailResult = [];
    for (var key of dishMap.keys()) {
        dishDetailResult.push({
            dishName : dishMap.get(key).name,
            dishUnit: dishMap.get(key).accountUnit,
            accountNum: dishMap.get(key).accountNum
        })
      }
    dishDetailResult.sort((a,b)=> b.accountNum  - a.accountNum)
    
    this.ctx.status = partOrderResult.status;
    this.ctx.set(partOrderResult.headers);
    this.ctx.body = {data: dishDetailResult};
  }
}

module.exports = ChartController;
