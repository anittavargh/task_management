var express = require('express')
var router = express.Router();
/**
 * controllers
 */

var tasksController = require('../controllers/tasks.controllers')

/**
 * for creating parents
 */
router.post('/', tasksController.create);

/**
 * for updating parents
 */
router.put('/:id', tasksController.update);

/**
 * for getting all parents
 */
router.get('/', tasksController.findAll);

/**
 * for finding by id
 */
router.get('/:id', tasksController.findByPk);

/**
 * deletion
 */
router.delete('/:id', tasksController.delete);

/**
 * count
 */
router.get('/dashboard/statuscount',tasksController.count);

module.exports = router;
