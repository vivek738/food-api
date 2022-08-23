const mongoose = require('mongoose');

const Product = mongoose.model('Product', {
    pname: {
        type:String,
    },
    pdesc : {
        type: String,
    },
    pprice : {
        type : String,
    },
    pphoto:{
        type:String
    }
});

module.exports = Product;
