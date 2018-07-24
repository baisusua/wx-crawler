'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
	async index() {
		this.ctx.body = '爬虫系统，暂时不支持API调用';
	}
}

module.exports = HomeController;