var express = require('express')
var router = express.Router();
/**
 * controllers
 */

var managersController = require('../controllers/managers.controllers')

/**
 * for creating parents
 */
router.post('/', managersController.create);

/**
 * for updating parents
 */
router.put('/:id', managersController.update);

/**
 * for getting all parents
 */
router.get('/', managersController.findAll);

/**
 * for finding by id
 */
router.get('/:id', managersController.findByPk);

/**
 * deletion
 */
router.delete('/:id', managersController.destroy);

module.exports = router;
