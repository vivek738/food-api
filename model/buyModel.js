const mongoose = require('mongoose');

const Buy = mongoose.model('Buy', {
    prodid: {
        type:mongoose.Schema.Types.ObjectId, ref:'Product'
    },
    user : {
        type:mongoose.Schema.Types.ObjectId, ref:'User'
    }
});

module.exports = Buy;
