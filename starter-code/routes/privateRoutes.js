const express        = require("express");
const passportRouter = express.Router();
const {topSecret} = require('../contollers/private')

passportRouter.get('/profile', topSecret)

module.exports = passportRouter