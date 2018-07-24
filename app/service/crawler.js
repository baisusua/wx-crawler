const Service = require('egg').Service;
const cheerio = require('cheerio');
class Crawler extends Service {
    async getList() {
        const url = 'http://api.shijieguan.cn/index.php/api/event/index?client_type=0&lang=zh-cn&sportid=0&tournamentid=1000&competitorid=0&venueid=0&cityid=0&dateid=0&sort=&order=asc&page=1&per_page=100';
        const list = await this.ctx.curl(url, {
            dataType: 'json',
        });
        return list.data.data.data;
    }
    async insert(model) {
        const isCreate = await this.ctx.model.WorldCup.findMatch(model.match_id);
        if (isCreate) {
            const status = await this.ctx.model.WorldCup.updateMacth(model)
            return status;
        } else {
            const status = await this.ctx.model.WorldCup.create(model)
            return status;
        }
        return isCreate;
    }
    async findPrice(list, index) {
        if (list[index]) {
            const match_id = list[index].vname;
            const url = 'http://www.shijieguan.cn/detail/' + match_id + '.html';
            const dom = await this.ctx.curl(url, {
                dataType: 'text',
            });
            const $ = cheerio.load(dom.data);
            const match_one_current_price = Number($('.cat1 .current-price').text().replace(/￥/, ''));
            const match_one_origin_price = Number($('.cat1 .origin-price').text().replace(/￥/, ''));
            const match_two_current_price = Number($('.cat2 .current-price').text().replace(/￥/, ''));
            const match_two_origin_price = Number($('.cat2 .origin-price').text().replace(/￥/, ''));
            const match_three_current_price = Number($('.cat3 .current-price').text().replace(/￥/, ''));
            const match_three_origin_price = Number($('.cat3 .origin-price', '#ticket-table').text().replace(/￥/, ''));
            const match_name = list[index].title;
            const match_date = new Date(list[index].date + ' ' + list[index].time);
            const match_location = list[index].venue_obj.country_title + '|' + list[index].venue_obj.city_title + '|' + list[index].venue_obj.title;
            const sub_title = list[index].sub_title;
            const item = {
                match_id: match_id,
                match_name: match_name,
                match_date: match_date,
                match_location: match_location,
                sub_title: sub_title,
                match_one_current_price: match_one_current_price,
                match_one_origin_price: match_one_origin_price,
                match_two_current_price: match_two_current_price,
                match_two_origin_price: match_two_origin_price,
                match_three_current_price: match_three_current_price,
                match_three_origin_price: match_three_origin_price
            }
            const status = await this.insert(item);
            this.findPrice(list, index + 1);
        }
    }
}

module.exports = Crawler;