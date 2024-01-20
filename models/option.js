const mongoose = require('mongoose');

//schema for options
const optionSchema = new mongoose.Schema({
    text : {
        type : String,
        required : true,

    },
    votes : {
        type : Number,
        default : 0
    },
    link_to_vote : {
        type : String
    },
    question_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Question',
        required : true
    }
},{
    timestamps : true
});

//conevrting the options schema into model
const Option = mongoose.model('Option',optionSchema);

module.exports = Option;