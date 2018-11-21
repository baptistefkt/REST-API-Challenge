const chai = require('chai');
const chaiHttp = require('chai-http');
const index = require('../index');
const expect = chai.expect;

chai.use(chaiHttp);
describe('test', () => {
    it('res.status equals 200 and res.body.success equals true', (done) => {
        chai.request(index)
            .post('/api/v1/quote/car-insurance')
            .send({ "car_value": "2000", "driver_birthdate": "10/06/1990" })
            .end(function (req, res) {
                expect(res).to.have.status(200);
                expect(res.body.success).to.equal(true);
            })
        done();
    });
});