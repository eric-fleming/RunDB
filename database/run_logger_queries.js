const runner_queries = require('./runner_model');
const run_history_queries = require('./running_history_db_queries');



// LOGIN
const Pool = require('pg').Pool;
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: 'runlogger',
    password: process.env.DB_PASSWORD,
    port: 5432
});