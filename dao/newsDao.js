var News = require('../models/news');

exports.findMatchNews = function(infoObj, callback)
{
    News.find(infoObj, callback);
};

exports.insertNews = function(newsObj, callback)
{
    (new News(newsObj)).save(callback);
};

exports.updateNewsIsRead = function(infoObj, callback) {
    News.update(infoObj, { is_read: true }, callback);
};