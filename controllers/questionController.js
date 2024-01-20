
const Question = require('../models/questions');
const Option = require('../models/option');
//function to create the question
module.exports.create = async (req,res)=>{

    try{

        const title = req.body.title;
        console.log(title);

        const existQues = await Question.findOne({'title' : title});

        if(existQues){
            return res.status(401).json({
                message : "Question already exists",
                status : "failure",
                data : [{id : existQues._id}]
            })
        };

        const question = await Question.create({
            'title' : title
        });

        return res.status(200).json({

            message : "Question create",
            status : "successfully",
            data : [question]

        });

    }catch(error){

        console.log('ERROR CREATING QUESTION: ', error);

        return res.status(500).json({
            message: 'Internal server error',
            status: 'failure',
            data: []
        });



    }


}
//used to delete the question if questio was deleted then entire options of the specifie d question also deleted
module.exports.delete = async (req,res)=>{
    try{
        const ques_id = req.params.id;
        if(!ques_id){
            return res.status(404).json({
                message: 'Empty Question id',
                status: 'failure',
                data: []
            });
        }

        const question = await Question.findById(ques_id);

        if(!question){

            return res.status(404).json({
                message: 'Invalid Question id',
                status: 'failure',
                data: []
            });

        }

        await Option.deleteMany({'_id': {
            $in : question.options
        }});

        await Question.findByIdAndDelete(ques_id);

        return res.status(200).json({
            message : 'Question deleted',
            status : 'successful',
            data : []
        })




    }catch(error){

        return res.status(500).json({
            message: 'Internal server error',
            status: 'failure',
            data: []
        });

    }
}

//to visuale the question and options

module.exports.getQuestion = async (req,res) => {
    try{

    const ques_id = req.params.id;

    if (!ques_id) {
        return res.status(404).json({
            message: 'Empty Question id',
            status: 'failure',
            data: []
        });
    };

    const question = await Question.findById(ques_id);

    if(!question){
        return res.status(404).json({
            message : "Invalid Question id",
            status : "failure",
            data : []
        })
    }

    await question.populate({path:'options'});

    return res.status(200).json({
        message : 'question fetched',
        status : "successful",
        data : [question]
    });



    }
    catch(error){

        return res.status(500).json({
            message: 'Internal server error',
            status: 'failure',
            data: []
        });

    }
}
