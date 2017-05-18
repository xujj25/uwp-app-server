var newsDao = require('../dao/newsDao');

var data_processor = function() {
    this.findAndInsertNews = function(news)
    {
        newsDao.findMatchNews(
            {
                news_id: news.news_id
            }, function(err, docs) {
                if (err)
                {
                    console.log(err.message);
                }
                else if (docs.length == 0)
                {
                    newsDao.insertNews(news, function(err, product, num) {
                            if (err)
                            {
                                console.log(err);
                            }
                            else
                            {
                                console.log('成功将新的资讯' + news.news_id + '插入数据库');
                                // console.log(product);
                            }
                        }
                    );
                }
                else
                {
                    console.log('news_id为 ', news.news_id, ' 条目已存在，不予插入');
                }
            }
        );
    }    
};

module.exports = data_processor;