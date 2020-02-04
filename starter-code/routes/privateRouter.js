const express = require("express");
const router = express.Router();

const {private} = require('../controllers/private.controller')

router.get('/private', private)

module.exports = router