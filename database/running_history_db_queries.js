// Dependencies
const { Pool, Client} = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: 'runlogger',
    password: process.env.DB_PASSWORD,
    port: 5432
});
// LOGIN
const CreateClient = ()=>{
    return new Client({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: 'runlogger',
        password: process.env.DB_PASSWORD,
        port: 5432
    });
} 



const getRunningHistory = () => {
    const client = CreateClient();
    return new Promise(function (resolve, reject) {
        client.connect();
        client.query('SELECT * FROM public."RunHistory"', (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results.rows);
            client.end();
        });
        
    })
};


const createRun = (body) => {
    const client = CreateClient();
    return new Promise(function (resolve, reject) {
        const { runnerid, date, distance, time } = body;

        let db_command = 'INSERT INTO public."RunHistory" (date,distance,runnerid,time) VALUES ($1,$2,$3,$4)';
        client.connect();
        client.query(db_command, [date, distance, runnerid, time], (error, results) => {
            if (error) {
                console.log(error)
                reject(error)
            }
            else{
                resolve(`A new run has been added: ${results.rows[0]}`)
            }
            client.end();

        });
    });
};



const editRun = (body) => {
    const client = CreateClient();
    return new Promise(function (resolve, reject) {
        const { run_uid, date, distance, time } = body;

        let db_command = 'UPDATE public."RunHistory" SET date = $1, distance = $2, time= $3 WHERE run_uid=$4';
        client.connect();
        client.query(db_command, [date, distance, time, run_uid], (error, results) => {
            if (error) {
                console.log(error)
                reject(error)
            }
            resolve(`Run modified to: ${results.rows[0]}`)
            client.end();
        });
    });
};


const deleteRun = (id) => {
    const client = CreateClient();
    return new Promise(function (resolve, reject) {
        const runUID = parseInt(id);
        let db_command = 'DELETE FROM public."RunHistory" WHERE run_uid=$1';
        client.connect()
        client.query(db_command, [runUID], (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(`Run with run_uid:${runUID} was deleted.`);
            client.end();
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