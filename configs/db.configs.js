module.exports = {
    "development": {
        "username": "root",
        "password": "root",
        "logging": true,
        "database": "task_management",
        "host": "localhost",
        "port": "3306",
        "dialect": "mariadb",
        "dialectOptions": {
          "useUTC": false,
          "timezone": "Asia/Kolkata"
        }
    },
    "production": {
        "username": process.env.DB_USERNAME,
        "password": process.env.DB_PASSWORD,
        "logging": false,
        "database": process.env.DB_DATABASE,
        "host": process.env.DB_HOST,
        "port": process.env.DB_PORT,
        "dialect": "mariadb",
        "dialectOptions": {
          "useUTC": false,
          "timezone": "Asia/Kolkata"
        }
    }
  }