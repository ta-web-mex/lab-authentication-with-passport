const { Router } = require ('express')
const router = Router();


//Estas vistas que se pasaran a crear en los controllers de protect
const {
    createGet,
  createPost,
  placeGet,
  profileGet
} = require ('../controllers/protectedControllers')



router.get('/create', createGet)
        .post('/create',createPost)
        .get('/place/:id',placeGet)
        .get('/profile',profileGet)
module.exports = router;