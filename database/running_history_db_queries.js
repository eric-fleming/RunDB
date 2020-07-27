// LOGIN
const Pool = require('pg').Pool;
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: 'runlogger',
    password: process.env.DB_PASSWORD,
    port: 5432
});



const getRunningHistory = () => {
    return new Promise(function (resolve, reject) {
        pool.query('SELECT * FROM public."History"', (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results.rows);
        })
    })
};


const createRun = (body) => {
    return new Promise(function (resolve, reject) {
        const { runnerid, date, distance, time } = body;

        let db_command = 'INSERT INTO public."History" (date,distance,runnerid,time) VALUES ($1,$2,$3,$4)';
        pool.query(db_command, [date, distance, runnerid, time], (error, results) => {
            if (error) {
                console.log(error)
                reject(error)
            }
            else{
                resolve(`A new run has been added: ${results.rows[0]}`)
            }
            

        });
    });
};


// EXPORTS
module.exports = {
    getRunningHistory,
    createRun
};