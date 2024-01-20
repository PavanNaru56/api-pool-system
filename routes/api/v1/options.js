

//it routes the controllers for option delete and addvote 
const express = require('express');
const questionController = require('../../../controllers/questionController');
const optionController = require('../../../controllers/optionsController');

const router = express.Router();

router.delete('/:id/delete',optionController.delete);

router.get('/:id/addVote',optionController.add_vote);

module.exports = router;