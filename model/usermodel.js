const mongoose = require('mongoose');

const User = mongoose.model('User', {
    fullname: {
        type:String,
        // required: true
    },
    email_address : {
        type: String,
        // required:true
    },
    username : {
        type : String,
        // required:true
    },
    password : {
        type : String,
        // required : true
    },
    userRole:{
        type:Number,
        // required : true
    },
    verified:{
        type:String,
        default:false
    }
});

module.exports = User;
