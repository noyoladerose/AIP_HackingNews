//* Create mongoose scheme for news"//
const mongoose = require('mongoose');
const Schema = mongoose.Schema
const newsSchema = Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        require: true
    },
    desc: {
        type: String,
        require: true
    },
    source: {
        type: String,
        require: true
    },
    url: [{
        type: String
    }]

});

module.exports = mongoose.model('News', newsSchema);