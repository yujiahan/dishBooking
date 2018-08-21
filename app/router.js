'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/nav/*', controller.home.index);
  
  router.get('/dish/getAllDish', controller.dish.getAllDish);
  router.get('/dish/getAllItem', controller.dish.getAllItem);
  router.get('/dish/addItem/:sortValue/:itemName/:remark', controller.dish.addItem);
  router.get('/dish/updateDish', controller.dish.updateDish); //拉取新菜单数据
  router.get('/dish/updateConsumeList/:dishId/:consumeList', controller.dish.updateDishConsume);
  router.get('/order/todayList', controller.order.todayList);
  router.get('/chart/getSaleDish', controller.chart.getSaleDish);
  router.get('/chart/getOrderList', controller.chart.getOrderList);
  router.get('/chart/getOrderDetailList', controller.chart.getOrderDetailList);
  router.get('/chart/getDishRank', controller.chart.getDishRank);
  router.get('/chart/getDishConsumeList/:chefName', controller.chart.getDishConsumeList);


  router.get('/chart/testData', controller.chart.testData )
  
  
  router.post('/import/busData', controller.import.busData )
  router.post('/perform/saveTodayConsume', controller.perform.saveTodayConsume )
  
  router.get('/perform/getAllData', controller.perform.getAllData )
  
};
