'use strict';
let genParam   = require('../utils/genRequestParam');
const url = "http://open.2dfire.com/router";
const Controller = require('egg').Controller;

class DishController extends Controller {
  async getAllDish() {
    this.ctx.body = await this.app.mysql.select('alldish');
  }

  async getAllItem() { //获取所有原料
    this.ctx.body = await this.app.mysql.select('dishitem');
  }
  async addItem() { //增加原料
    const itemName = this.ctx.params.itemName;
    const sortValue = this.ctx.params.sortValue;
    const remark = this.ctx.params.remark;
    const result = await this.app.mysql.insert('dishitem', {item_sort: sortValue, item_name: itemName, remark:remark} );
    this.ctx.body = {
      success : result.affectedRows === 1
    }
  }
  async updateDish() { //重新拉取菜品数据
    let errCount = 0;
    const menuDishResult = await this.app.curl(url, {
      method: 'POST',
      data: genParam('dfire.shop.day.memu.data')
    });
    const newDishList = JSON.parse(menuDishResult.data.toString()).model;
    for( let idx in newDishList ) {
      try {
        await this.app.mysql.insert('alldish', {name: newDishList[idx].menuName} );
      }
      catch(err) { errCount ++ }
    }
    this.ctx.body = {
      success : newDishList.length - errCount
    }
  }
  async updateDishConsume(){
    const dishId =  this.ctx.params.dishId;
    const consumeList =  this.ctx.params.consumeList;
    
    const result = await this.app.mysql.update('alldish', {consume_list: consumeList}, {
      where: {
        code: dishId
      }
    });
    this.ctx.body = {
      success : result.affectedRows === 1
    }
  }
}

module.exports = DishController;
