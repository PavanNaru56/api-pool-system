const mongoose = require('mongoose');

//question schema
const questionSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        unique : true
    },
    options : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Option'
        }
    ]
},{
    timestamps : true
});

//converts the schema into model

const Question = mongoose.model('Question',questionSchema);

module.exports = Question;