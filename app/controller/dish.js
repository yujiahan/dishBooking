'use strict';

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
    let newDishList =  [
      {
          "id": "123",
          "name": "王老吉",
          "price": 3        
      },{
         "id":'234',
         "name": "雪碧",
         "price": 2
      }
    ]
    for( let idx in newDishList) {
      try {
        await this.app.mysql.insert('alldish', {code: newDishList[idx].id, name: newDishList[idx].name} );
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
