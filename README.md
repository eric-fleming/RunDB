# RunDB
PostgresSQL database that pairs with RunLogger

## Get started
**npm install** and **npm start** to get up and running.  I also have a dev-dependency with nodemon, so you can optionally run **nodemon index.js** after the install to have it refresh as you save changes to the code.


Runs at http://localhost:3001

## Routes

#### /runners
gets all of the runners

#### /runner/:id
gets a specific runner

#### /addrunner
create a new runner

#### /runs
get every run logged into the the database from any runner
