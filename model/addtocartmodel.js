const mongoose = require('mongoose');

const Addtocart = mongoose.model('Addtocart', {
    prodid: {
        type:mongoose.Schema.Types.ObjectId, ref:'Product'
    },
    user : {
        type:mongoose.Schema.Types.ObjectId, ref:'User'
    }
});

module.exports = Addtocart;
