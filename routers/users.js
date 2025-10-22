const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.js");

const { index, show } = usersController;

router.get('/', index);
router.get('/:userId', show);

module.exports = router;
