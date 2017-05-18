var cheerio = require('cheerio');
var Data_processor = require('./data_processor');
var data_processor = new Data_processor();
var Request = require('request');
var spiderDstSite = '人民网';
var newsIdPrefix = 'renmin';
var reqUrl = 'http://m.people.cn/52/index.html';
var detailUrlPrefix = 'http://m.people.cn';


var renmin_spider = function() {
    var that = this;
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
                var newsArr = that.htmlProcessor(body); // 转成json格式
                var i;
                for (i = 0; i < newsArr.length; i++)
                {
                    data_processor.findAndInsertNews(newsArr[i]);
                }
            }
        }
    );

    this.htmlProcessor = function(html)
    {
        var $ = cheerio.load(html); //引入cheerio的方法。这样的引入方法可以很好的结合jQuery的用法。
        var jsonArr = [];
        $('.news-txt-list .clear').each(function(i,elem) {
            var news_title = $(this).find('span a').text();
            var pic_url = $(this).find('a img').attr('src');
            var detailUrl = detailUrlPrefix + $(this).find('span a').attr('href');
            var info = '' + $(this).find('span a').attr('href');
            var year = parseInt(info.substr(4, 4));
            var month = parseInt(info.substr(9, 2));
            var day = parseInt(info.substr(11, 2));
            var id = info.substring(14, info.length - 5);
            
            jsonArr.push({
                news_id: newsIdPrefix + id,
                img_url: pic_url ? pic_url : '',
                detail_url: detailUrl,
                title: news_title,
                src_site: '人民网',
                date: new Date(year, month - 1, day),
                is_read: false
            });
        });
        
        return jsonArr;
    }
};

module.exports = renmin_spider;