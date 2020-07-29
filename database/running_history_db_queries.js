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
        pool.query('SELECT * FROM public."RunHistory"', (error, results) => {
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

        let db_command = 'INSERT INTO public."RunHistory" (date,distance,runnerid,time) VALUES ($1,$2,$3,$4)';
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



const editRun = (body) => {
    return new Promise(function (resolve, reject) {
        const { run_uid, date, distance, time } = body;

        let db_command = 'UPDATE public."RunHistory" SET date = $1, distance = $2, time= $3 WHERE run_uid=$4';
        pool.query(db_command, [date, distance, time, run_uid], (error, results) => {
            if (error) {
                console.log(error)
                reject(error)
            }
            resolve(`Run modified to: ${results.rows[0]}`)

        });
    });
};


const deleteRun = (id) => {
    return new Promise(function (resolve, reject) {
        const runUID = parseInt(id);
        let db_command = 'DELETE FROM public."RunHistory" WHERE run_uid=$1';
        pool.query(db_command, [runUID], (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(`Run with run_uid:${runUID} was deleted.`)
        });
    });
};



// EXPORTS
module.exports = {
    getRunningHistory,
    createRun,
    editRun,
    deleteRun
};