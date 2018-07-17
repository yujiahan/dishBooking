'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="theme-color" content="#000000"><link rel="manifest" href="/manifest.json"><link rel="shortcut icon" href="/favicon.ico"><meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no"/><script src="https://as.alipayobjects.com/g/component/fastclick/1.0.6/fastclick.js"></script><script>document.addEventListener("touchstart",function(e){e.cancelable&&(e.defaultPrevented||e.preventDefault())},!1),"addEventListener"in document&&document.addEventListener("DOMContentLoaded",function(){FastClick.attach(document.body)},!1)</script><title>React App</title><link href="/public/static/css/main.c0a57f6a.css" rel="stylesheet"></head><body><div id="root"></div><script type="text/javascript" src="/public/static/js/main.f1d15bc4.js"></script></body></html>';
  }
}

module.exports = HomeController;
