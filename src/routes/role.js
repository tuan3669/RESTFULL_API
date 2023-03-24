const { Router } = require('express');
const controllers = require('../controllers/role');
const router = Router();

// get  by id
// router.get('/:id', controllers.getById);
// // get all
// router.get('/', controllers.getAll);

// create a new role
router.post('/', controllers.create);

// updated a new post

// remove a new post

module.exports = router;
