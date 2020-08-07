// Dependencies
const { Pool, Client } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: 'runlogger',
    password: process.env.DB_PASSWORD,
    port: 5432
});
// LOGIN
const CreateClient = () => {
    return new Client({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: 'runlogger',
        password: process.env.DB_PASSWORD,
        port: 5432
    });
}


// QUERIES
const getAllRunners = () => {
    const client = CreateClient();
    return new Promise(function (resolve, reject) {
        client.connect();
        client.query('SELECT * FROM public."Runners"', (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results.rows);
            client.end();
        })
    })
}

const getRunnerById = (id) => {
    const client = CreateClient();
    return new Promise(function(resolve, reject){
        client.connect();
        client.query('SELECT * FROM public."Runners" WHERE id= $1', [id], (error, result) => {
            if(error){
                reject(error)
            }
            resolve(result.rows);
            client.end();
        });
    });
};


const createRunner = (body) => {
    const client = CreateClient();
    return new Promise(function(resolve, reject){
        const { first, last } = body;

        let db_command = 'INSERT INTO public."Runners" (first,last) VALUES ($1,$2)';
        client.connect();
        client.query(db_command, [first, last], (error,results)=>{
            if (error) {
                reject(error)
            }
            resolve(`A new runner has been added: ${results.rows[0]}`)
            client.end();
        });
    });
};

const editRunner = (body) => {
    const client = CreateClient();
    return new Promise(function (resolve, reject) {
        const { runnerid, first, last } = body;

        let db_command = 'UPDATE public."Runners" SET first = $1, last = $2 WHERE id=$3';
        client.connect();
        client.query(db_command, [first, last, runnerid], (error, results) => {
            if (error) {
                console.log(error)
                reject(error)
            }
            resolve(`Runner with id=${runnerid} modified to: ${results.rows[0]}`)
            client.end();
        });
    });
};


const deleteRunner = (id) => {
    const client = CreateClient();
    return new Promise(function(resolve,reject){
        const runnerID = parseInt(id);
        let db_command = 'DELETE FROM public."Runners" WHERE id=$1';
        client.connect();
        client.query(db_command, [runnerID], (error, results)=>{
            if (error) {
                reject(error)
            }
            resolve(`Runner with ID:${runnerID} was deleted.`);
            client.end();
        });
    });
};


// EXPORTS
module.exports = {
    getAllRunners,
    getRunnerById,
    createRunner,
    editRunner,
    deleteRunner
};