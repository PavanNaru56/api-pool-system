
//import the modules from the models for creating,deleting or updating the database
const Question = require('../models/questions');
const Option = require('../models/option');

//function to create the options for the specified question
module.exports.create = async (req,res) => {

    try{

        const quesId = req.params.id;

        const {text} = req.body;

        if(!quesId || !text){
            return res.status(404).json({
                message : "Please enter the question id or text for options",
                status : "Failure",
                data : []
            })
        }

        const question = await Question.findById(quesId);

        if(!question){

            return res.status(404).json({
                message: 'Invalid Question id',
                status: 'failure',
                data: []
            });

        }


        const option = await Option.create({

            'text' : text,
            'question_id' : quesId, 


        });

        const voteUrl = `http://localhost:8000/api/v1/options/`;
        option.link_to_vote = `http://localhost:8000/api/v1/options/${option.id}/addVote`;
        
        await option.save();

        console.log(option._id);

        question.options.push(option._id);
        await question.save();

        return res.status(200).json({
            message : "Option created successfully",
            status : "successfull",
            data : [option]
        });





    }
    catch(error){

        return res.status(500).json({
            message: 'Internal Server Error',
            status: 'failure',
            data: []
        })

    }
}


//function used to delete the options

module.exports.delete = async function (req, res) {

    try {


        const optionId = req.params.id;

        if (!optionId) {
            return res.status(404).json({
                message: 'Empty option id recieved',
                status: 'failure',
                data: []
            });
        };

        const option = await Option.findById(optionId);

        if (!option) {
            return res.status(404).json({
                message: 'Invalid option id recieved',
                status: 'failure',
                data: []
            });
        };

        await Question.findByIdAndUpdate(option.question_id, { $pull: { 'options': option.id } });
        await Option.findByIdAndDelete(optionId);

        return res.status(200).json({
            message: 'Option deleted',
            status: 'successful',
            data: []
        });

    } catch (error) {
        console.log('DELETE OPTION ERROR: ', error);

        return res.status(500).json({
            message: 'Internal Server Error',
            status: 'failure',
            data: []
        })
    }

}

//function to vote the specified option
module.exports.add_vote =  async (req,res) => {
    try{

        const option_id = req.params.id;

        if (!option_id) {
            return res.status(404).json({
                message: 'Empty option id recieved',
                status: 'failure',
                data: []
            });
        };

        const option = await Option.findById(option_id);

        if (!option) {
            return res.status(404).json({
                message: 'Invalid option id recieved',
                status: 'failure',
                data: []
            });
        };

        option.votes++;
        await option.save();

        return res.status(200).json({
            message : "vote increased",
            status : 'successful',
            data : [option]
        })




    }catch(error){

        return res.status(500).json({
            message: 'Internal Server Error',
            status: 'failure',
            data: []
        })

    }
}