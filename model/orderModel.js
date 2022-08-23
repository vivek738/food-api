const mongoose = require('mongoose');

const Order = mongoose.model('Order', {
    fname: {
        type:String,
        require: true
    },
    lname : {
        type: String,
        require:true
    },
    forder : {
        type : String,
        require:true
    },
    sorder : {
        type : String,
        require : true
    },
    address:{
        type:Number,
        require : true
    },
    phone:{
        type:String,
        require : true
    }
});

module.exports = Order;
