const initDb = require('../models/sql');
const db = initDb();

db.sequelize.sync({force: true}).then(() => {
    console.log('Drop and Resync with { force: true }');
});