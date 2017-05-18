var newsDao = require('../dao/newsDao');

var exceptionHandler = function(e) {
    console.log('handle error in getNewsList', e.toString());
    res.send({
        is_success: 0,
        err_msg: e.message
    });
};

var NewsListException = function(message) {
    this.name = 'NewsListException';
    this.err = new Error(message);
    this.message = this.err.message;
}

var getNewsList = function(req, res, next) {
    var that = this;

    this.exceptionHandler = function(e) {
        console.log('handle error in getNewsList', e);
        res.send({
            is_success: 0,
            err_msg: (e instanceof NewsListException) ? e.message : '服务器错误'
        });
    };
    
    this.responseData = {
        is_success: 1,
        news: []
    }; 

    this.newsDataProcessor = function(news) {
        newsDao.updateNewsIsRead({
            news_id: news.news_id
        }, function() {
            console.log('news ' + news.news_id + ' is read and update');
        });
    }   

    try 
    {
        newsDao.findMatchNews(
            {
                is_read: false
            },
            function(err, docs) {
                try
                {
                    console.log('finish query');
                    if (err) {
                        console.log(err);
                        throw err;
                    } else if (docs.length == 0) {
                        console.log('暂无新的资讯');
                        throw new NewsListException('暂无新的资讯');
                    } else {                  
                        docs.sort(function(a, b) {
                            return a.date < b.date ? 1 : -1;
                        });
                        var len = docs.length < 20 ? docs.length : 20;
                        var news;
                        for (var i = 0; i < len; i++) {
                            news = docs[i];
                            that.responseData.news.push({
                                news_id: news.news_id,
                                img_url: news.img_url ? news.img_url : '',
                                title: news.title,
                                src_site: news.src_site,
                                detail_url: news.detail_url
                            });
                            that.newsDataProcessor(news);
                        }
                        
                        res.send(that.responseData);
                    }
                }
                catch (e) {
                    that.exceptionHandler(e);
                }
            }
        );
    } catch (e) {
        that.exceptionHandler(e);
    }
};

module.exports = getNewsList;
