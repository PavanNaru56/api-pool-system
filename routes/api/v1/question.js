const questionController = require('../../../controllers/questionController');
const optionController = require('../../../controllers/optionsController');
const express = require('express');

const router = express.Router();

router.post('/create',questionController.create);
router.delete('/:id/delete',questionController.delete);
router.get('/:id',questionController.getQuestion);
router.post('/:id/options/create',optionController.create);






module.exports = router;