//  DEPENDENCIES
const app = require('./app');
const port = 3001;

// START SERVER
app.listen(port, () => {
    console.log(`App running on port ${port}`);
});


// '0.0.0.0' to opt out of local host
/**
 * console.log(req.params.id);
    console.log('------------------------------');
    console.log(req.body);
    console.log(req.route);
 */