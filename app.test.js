const request = require('supertest');
const app = require('./app');

describe(`smoke testing`, ()=> {
    test(`Root path is up`, ()=>{
        return request(app).get(`/`).expect(200);
    });


    test(`Runners path is up`, () => {
        return request(app)
                .get(`/runners`)
                .expect('Content-Type', /json/,)
                .expect(200);
    });

    test(`Runs path is up`, () => {
        return request(app)
                .get(`/runs`)
                .expect('Content-Type', /json/)
                .expect(200);
                
    });



});