var mongoose = require('../dao/connectDB');

var Schema = mongoose.Schema;

var newsSchema = new Schema(
    {
        news_id: String,
        img_url: String,
        detail_url: String,
        title: String,
        src_site: String,
        date: Date,
        is_read: Boolean
    }
);

module.exports = mongoose.model('News', newsSchema);