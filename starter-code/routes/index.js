const express = require('express');
const router  = express.Router();

const Place = require ('../models/Place')
/* GET home page  Con el -1 para que se ordenen de menor a mayor*/
router.get('/', async (req,res) => {
  const places = await Place.find().sort({createdAt : -1})
  res.render('index', {places})
}
)


module.exports = router;
