// LOGIN
const Pool = require('pg').Pool;
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: 'runlogger',
    password: process.env.DB_PASSWORD,
    port: 5432
});


// QUERIES
const getAllRunners = () => {
    return new Promise(function (resolve, reject) {
        pool.query('SELECT * FROM public."Runners"', (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results.rows);
        })
    })
}

const getRunnerById = (id) => {
    return new Promise(function(resolve, reject){
        pool.query('SELECT * FROM public."Runners" WHERE id= $1', [id], (error, result) => {
            if(error){
                reject(error)
            }
            resolve(result.rows);
        });
    });
};


const createRunner = (body) => {
    return new Promise(function(resolve, reject){
        const { first, last } = body;

        let db_command = 'INSERT INTO public."Runners" (first,last) VALUES ($1,$2)';
        pool.query(db_command, [first, last], (error,results)=>{
            if (error) {
                reject(error)
            }
            resolve(`A new runner has been added: ${results.rows[0]}`)
            
        });
    });
};


// EXPORTS
module.exports = {
    getAllRunners,
    getRunnerById,
    createRunner
};