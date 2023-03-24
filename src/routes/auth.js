const { Router } = require('express');
const controllers = require('../controllers/auth');
const router = Router();

router.post('/register', controllers.register);
router.post('/login', controllers.login);

module.exports = router;
