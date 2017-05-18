var Data_processor = require('./data_processor');
var data_processor = new Data_processor();
var Request = require('request');
var spiderDstSite = '环球网';
var newsIdPrefix = 'huanqiu';
var reqUrl = 'http://uluai.com.cn/rcmd/falls/getRtCmd?siteId=5011&num=';
var reqNewsCount = 100; // 每次获取100条新闻

reqUrl += reqNewsCount;

var huanqiu_spider = function() {
    Request.get(
        {
            uri: reqUrl,
            header: {
                'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.96 Safari/537.36'
            }
        },
        function(err, res, body) {
            if (err)
            {
                console.log(spiderDstSite + '资讯列表爬虫访问失败');
                console.log(err);
            }
            else
            {
                console.log(spiderDstSite + '资讯列表爬虫访问成功');
                var newsArr = JSON.parse(body); // 转成json格式
                var i;
                for (i = 0; i < newsArr.length; i++)
                {
                    data_processor.findAndInsertNews(
                        {
                            news_id: newsIdPrefix + newsArr[i].id,
                            img_url: (newsArr[i].pic[0] === undefined ? '' : newsArr[i].pic[0]),
                            detail_url: newsArr[i].url,
                            title: newsArr[i].title,
                            src_site: newsArr[i].source,
                            date: new Date(newsArr[i].date),
                            is_read: false
                        }
                    );
                }
            }
        }
    );
};

module.exports = huanqiu_spider;