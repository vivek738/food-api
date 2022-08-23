const mongoose = require('mongoose');

const Menuproduct = mongoose.model('Menuproduct', {
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

module.exports = Menuproduct;
