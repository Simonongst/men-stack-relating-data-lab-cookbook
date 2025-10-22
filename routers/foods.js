const express = require('express');
const router = express.Router();
const foodsController = require("../controllers/food.js");

const {index, create, show, update, remove} = foodsController;

router.get('/', index);
router.post('/', create);
router.get('/:itemId', show);
router.put('/:itemId', update);
router.delete('/:itemId', remove);

module.exports = router;