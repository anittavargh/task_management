/**
 * imports
 */
//const initDB = require('../models/sql')
/**
 * create
 */
module.exports.create = async (req,res,next) => {
        try {
            var DB = require('../models/sql');
            const Tasks = DB.tasks;

            var tasks = await new Tasks(req.body).save()
            res.send(tasks)
        } catch(error){
            next(error)
        }
}

/**
 * update
 */
module.exports.update = async(req, res, next) => {
    try { 
        const db = initDB();
        const Tasks = db.tasks;

        var tasks = await Tasks.update(req.body, {
            where: {
                tasks_id : req.params.id
            }
        })
        res.send(tasks)
    } catch (error) {
        next(err)
    }
}

/**
 * findAll
 */
module.exports.findAll = async(req, res, next) => {
    try {
        var DB = require('../models/sql');
        const Tasks = DB.tasks;
        const Managers = DB.managers;

        var whereTasks = req.query.tasks
        var whereManagers = req.query.managers

        var tasks = await Tasks.findAll({
            where: whereTasks,
            include: [{
                model: Managers,
                where: whereManagers
            }]
        })
        res.send(tasks)
    }catch (error) {
        next(error)
    }
}
/**
 * find by id 
 */
module.exports.findByPk = async(req, res, next) => {
    try {
        var DB = require('../models/sql');
        const Tasks = DB.tasks;

        whereTasks = req.params.id 

        var tasks = await Tasks.findByPk(req.params.id, {
                include: [{
                    all: true,
                    nested: true 
                }]
        })
        res.send(tasks)
    } catch (error) {
        next(err0r)
    }
}
/**
 * delete 
 */
module.exports.delete = async (req, res, next) => {
    try{
        var DB = require('../models/sql');
        const Tasks = DB.tasks;

        var tasks = await Tasks.destroy({
            where: {
                tasks_id:req.params.id
            }
        })   
        res.status(204).end()
    } catch(error) {
        next(error)
    }
};

/**
 * count of status
 */
module.exports.count = async(req, res, next) => {
    try {
        var DB = require('../models/sql');
        const Tasks = DB.tasks;

        var open = await Tasks.count({
            where: {
                status:'1'
            }

        })
        var pending = await Tasks.count({
            where: {
                status:'2'
            }
        })
        var closed = await Tasks.count({
            where: {
                status:'3'
            }
        })
        res.send(
            // {   open:open,
            //     pending:pending,
            //     closed :closed
            // }
            
                [{"status":"open",
                "count":open},
                {"status":"pending",
                "count":pending},
                {"status":"closed",
                "count":closed}]
            )
        // console.log('open-',open)
        // console.log('closed-',closed)
        // console.log('pending-',pending)
    } catch(error) {
        next(error)
    }
};