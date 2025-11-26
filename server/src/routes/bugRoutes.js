const express = require('express');
const router = express.Router();
const {
    getAllBugs,
    getBugById,
    createBug,
    updateBug,
    deleteBug
} = require('../controllers/bugController');

router.route('/')
    .get(getAllBugs)
    .post(createBug);

router.route('/:id')
    .get(getBugById)
    .put(updateBug)
    .delete(deleteBug);

module.exports = router;