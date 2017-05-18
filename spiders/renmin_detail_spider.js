const cheerio = require('cheerio');
const Request = require('request');

var renmin_detail_spider = function(reqUrl, callback) {
    var that = this;

    this.htmlProcessor = function(html) {
        var $ = cheerio.load(html);
        var paraArr = $('#p_content p').toArray();
        var result = '';
        for (var i = 0; i < paraArr.length; i++) {
            result += $(paraArr[i]).text();
        }
        return result;
    };

    Request.get(
        {
            uri: reqUrl,
            header: {
                'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.96 Safari/537.36'
            }
        },
        function(err, res, body) {
            if (err) {
                console.log(reqUrl + '详情页爬虫访问失败');
                console.log(err);
                if (callback) {
                    callback(err, null);
                }
            } else {
                console.log(reqUrl + '详情页爬虫访问成功');
                // console.log(that.htmlProcessor(body));
                if (callback) {
                    callback(null, that.htmlProcessor(body));
                }
            }
        }
    );
}

module.exports = renmin_detail_spider;