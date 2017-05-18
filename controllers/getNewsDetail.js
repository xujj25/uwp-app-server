var renmin_detail_spider = require('../spiders/renmin_detail_spider');
var huanqiu_detail_spider = require('../spiders/huanqiu_detail_spider');
var detail_spider = {
    'renmin': renmin_detail_spider,
    'huanqi': huanqiu_detail_spider
}; 

var DetailException = function(message) {
    this.name = 'DetailException';
    this.err = new Error(message);
    this.message = this.err.message;
};

var getNewsDetail = function(req, res, next) {
    var that = this;
    
    this.exceptionHandler = function(e) {
        console.log('handle error in getNewsDetail', e);
        res.send({
            is_success: 0,
            err_msg: (e instanceof DetailException) ?  e.message : '服务器错误'
        });
    };
    
    try 
    {
        if (req.query.url === undefined || req.query.news_id === undefined) {
            throw new DetailException('查询错误');
        } else {
            var spider = detail_spider[req.query.news_id.substr(0, 6)];
            if (spider === undefined) {
                throw new DetailException('查询错误');
            }
            spider(req.query.url, function(err, data) {
                try
                {
                    if (err) {
                        throw new DetailException('服务器错误');
                    } else {
                        res.send({
                            is_success: 1,
                            news_detail: data
                        });
                    }
                } catch (e) {
                    that.exceptionHandler(e);
                }
            });
        }
    }
    catch(e)
    {
        that.exceptionHandler(e);
    }
};

module.exports = getNewsDetail;
