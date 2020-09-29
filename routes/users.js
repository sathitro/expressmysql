const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/* GET users listing. */
router.get('/',userController.index );
router.post('/',userController.insert );

router.get('/:id',userController.showUserByID );


module.exports = router;
