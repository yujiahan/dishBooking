'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  
  router.get('/dish/getAll', controller.dish.getAll);
  router.get('/order/todayList', controller.order.todayList);
};
