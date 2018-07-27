'use strict';
 let genParam   = require('../utils/genRequestParam');
 const url = "http://open.2dfire.com/router";
const Controller = require('egg').Controller;
let moment = require('moment')

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

  async getOrderDetailList(){ //订单详细数据
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
  async getDishRank(){ //菜品排行
    var result = await this.getDishRankPureData(); 
    
    this.ctx.status = result.partOrderResult.status;
    this.ctx.set(result.partOrderResult.headers);
    this.ctx.body = {data: result.dishDetailResult};
  }

  async getDishConsumeList(){


    var dishRank = await this.getDishRankPureData();
    var dishDatabase =  await this.app.mysql.select('alldish');

    var dishConsumeMap = new Map();
    
    dishRank.dishDetailResult.forEach((rankDish)=>{
        dishDatabase.forEach((dishdb)=>{
             if(dishdb.name === rankDish.dishName && dishdb.consume_list !== null) {
                var consumeList = dishdb['consume_list'].split(',');
                consumeList.forEach((item=>{
                    var itemName = item.split('|')[0];
                    if( !dishConsumeMap.has(itemName)) {
                        dishConsumeMap.set(itemName, {
                            amount: 0,
                            dishList: []
                        })
                    }
                    var oldAmount = dishConsumeMap.get(itemName).amount;
                    
                    dishConsumeMap.get(itemName).dishList.push({
                        name: rankDish.dishName,
                        num: rankDish.accountNum
                    })
                    dishConsumeMap.set(itemName, {
                        amount: oldAmount + rankDish.accountNum * item.split('|')[1],
                        dishList: dishConsumeMap.get(itemName).dishList
                    })
                }))

                 
            }
        })
        var consumeResponseData = [];
        for (let [key,value]  of  dishConsumeMap){
            consumeResponseData.push({
                name: key, 
                totalConsume: value.amount, 
                saleDishList: value.dishList
            })
        }
        this.ctx.status = 200;
        this.ctx.set({
            'content-type': 'application/json; charset=utf-8'
        });
        this.ctx.body = {
            lastUpdateTime: moment().format('YYYY-MM-DD hh:mm:ss'),
            data: consumeResponseData
        };
    })
  }
  async getDishRankPureData(){
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
    
    return {
        partOrderResult: partOrderResult,
        dishDetailResult: dishDetailResult
    } 
   
  }
}

module.exports = ChartController;
