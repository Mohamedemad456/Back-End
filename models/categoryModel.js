const mongoose = require('mongoose');


const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Category is Required"]
    }
});


const Category = mongoose.model('Category',categorySchema);

module.exports = Category;