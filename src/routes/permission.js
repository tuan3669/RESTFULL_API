const { Router } = require('express');
const controllers = require('../controllers/permission');
const router = Router();

// get  by id
// router.get('/:id', controllers.getById);
// // get all
// router.get('/', controllers.getAll);

// create a new post
router.post('/', controllers.create);

// updated a new post

router.put('/:id', controllers.update);

// remove a new post

module.exports = router;
