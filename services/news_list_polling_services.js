const huanqiu_newslist_spider = require('../spiders/huanqiu_newslist_spider');
const renmin_newslist_spider = require('../spiders/renmin_newslist_spider');

var polling_callback = function() {
  console.log('资讯列表刷新轮询服务执行');
  huanqiu_newslist_spider();
  renmin_newslist_spider();
}

var news_list_polling_services = function() {
  polling_callback();
  setInterval(polling_callback, 600000); // 根据资讯来源的更新频率，选择每10分钟轮询一次
};

module.exports = news_list_polling_services;