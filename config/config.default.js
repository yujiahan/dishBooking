'use strict';
var  path  = require('path')
var fs = require('fs')
module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1517280014725_411';

  // add your config here
  config.middleware = ['accessLogger'];
  config.siteFile = {
    '/favicon.ico': fs.readFileSync(path.join(__dirname, 'favicon.png')),
  };
  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: 'bj-cdb-87mvauw8.sql.tencentcdb.com',
      // 端口号
      port: '63163',
      // 用户名
      user: 'root',
      // 密码
      password: 'Hannah1@',
      // 数据库名
      database: 'dish',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };
  
  config.static = {
    prefix: '/',
    dir: path.join(appInfo.baseDir, 'app/build'),
    // support lazy load
    dynamic: true,
    preload: false,
    buffer: false,
    maxFiles: 1000,
  };
  config.security = {
    csrf: {
      enable: false
    },
  };
  

  return config;
};
