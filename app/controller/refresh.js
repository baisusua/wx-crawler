'use strict';

const Controller = require('egg').Controller;

class RefreshController extends Controller {
    async index() {
        const list = await this.ctx.service.crawler.getList();
        this.ctx.service.crawler.findPrice(list, 0);
        this.ctx.body = {
            message: '刷新成功，1分钟后将会主动更新数据'
        };
    }
}

module.exports = RefreshController;