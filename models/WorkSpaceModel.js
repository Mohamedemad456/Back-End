const mongoose = require('mongoose');


const WorkSpaceSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is Required"]
    },
    createdAt:{
        type:Date,
        default:null
    },
    tasks:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Task'
    }],
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true,"User Is Required"]
    }
});

const WorkSpace = mongoose.model('WorkSpace',WorkSpaceSchema);

module.exports = WorkSpace;