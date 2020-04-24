/**
 * imports
 */
const initDB = require('../models/sql')
/**
 * create
 */
module.exports.create = async (req,res,next) => {
        try {
            var DB = require('../models/sql');
            const Managers = DB.managers;

            var managers = await new Managers(req.body).save()
            res.send(managers)
        } catch(error){
            next(error)
        }
}

/**
 * update
 */
module.exports.update = async(req, res, next) => {
    try { 
        var DB = require('../models/sql');
        const Managers = DB
        .managers;

        var managers = await Managers.update(req.body, {
            where: {
                managers_id : req.params.id
            }
        })
        res.send(managers)
    } catch (error) {
        next(error)
    }
}

/**
 * findAll
 */
module.exports.findAll = async(req, res, next) => {
    try {
        var DB = require('../models/sql');
        const Managers = DB.managers;

        var whereManagers = req.query.managers
        
        var managers = await Managers.findAll({
            where: whereManagers 
        })
        res.send(managers)
    } catch(error) {
        next(error)
    }
}

/**
 * find by id 
 */
module.exports.findByPk = async(req, res, next) => {
    try {
        var DB = require('../models/sql');
        const Managers = DB.managers;
        
        var managers = await Managers.findByPk(req.params.id)
        res.send(managers)
    } catch (error) {
        next(error)
    }
}
/**
 * delete 
 */
module.exports.destroy = async (req, res, next) => {
    try{
        var DB = require('../models/sql');
        const Managers = DB.managers;

        var managers = await Managers.destroy({
            where: {
                managers_id:req.params.id
            }
        })   
        res.status(204).end()
    } catch(error) {
        next(error)
    }
};