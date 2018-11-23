const chai = require("chai");
const chaiHttp = require("chai-http");
const index = require("../index");
const expect = chai.expect;

chai.use(chaiHttp);

describe("wrong route", () => {
  it("res.status equals 404", done => {
    chai
      .request(index)
      .post("/wrong_route")
      .send({ car_value: "2000", driver_birthdate: "10/06/1990" })
      .end(function(req, res) {
        expect(res).to.have.status(404);
      });
    done();
  });
});

describe("params missing", () => {
  it("res.status equals 400 and res.body.success equals false", done => {
    chai
      .request(index)
      .post("/v1/quote/car-insurance")
      .send()
      .end(function(req, res) {
        expect(res).to.have.status(400);
        expect(res.body.success).to.equal(false);
      });
    done();
  });
});

describe("one of params missing", () => {
  it("res.status equals 400 and res.body.success equals false", done => {
    chai
      .request(index)
      .post("/v1/quote/car-insurance")
      .send({ driver_birthdate: "10/06/1990" })
      .end(function(req, res) {
        expect(res).to.have.status(400);
        expect(res.body.success).to.equal(false);
      });
    done();
  });
});

describe("params wrong value", () => {
  it("res.status equals 400 and res.body.success equals false", done => {
    chai
      .request(index)
      .post("/v1/quote/car-insurance")
      .send({ car_value: "20A0", driver_birthdate: "10/06/1990" })
      .end(function(req, res) {
        expect(res).to.have.status(400);
        expect(res.body.success).to.equal(false);
      });
    done();
  });
});

describe("params wrong value", () => {
  it("res.status equals 400 and res.body.success equals false", done => {
    chai
      .request(index)
      .post("/v1/quote/car-insurance")
      .send({ car_value: "2000", driver_birthdate: "10//06/1990" })
      .end(function(req, res) {
        expect(res).to.have.status(400);
        expect(res.body.success).to.equal(false);
      });
    done();
  });
});

describe("case under 18", () => {
  it("res.status = 200, res.body.success = true and res.body.data.eligible = false", done => {
    chai
      .request(index)
      .post("/v1/quote/car-insurance")
      .send({ car_value: "2000", driver_birthdate: "10/06/2005" })
      .end(function(req, res) {
        expect(res).to.have.status(200);
        expect(res.body.success).to.equal(true);
        expect(res.body.data.eligible).to.equal(false);
      });
    done();
  });
});

describe("case under between 18 and 26", () => {
  it("res.status = 200, res.body.success = true, res.body.data.eligible = true and res.body.data.premiums.civil_liability = 1000 ", done => {
    chai
      .request(index)
      .post("/v1/quote/car-insurance")
      .send({ car_value: "2000", driver_birthdate: "10/06/1997" })
      .end(function(req, res) {
        expect(res).to.have.status(200);
        expect(res.body.success).to.equal(true);
        expect(res.body.data.eligible).to.equal(true);
        expect(res.body.data.premiums.civil_liability).to.equal(1000);
      });
    done();
  });
});

describe("case 26+", () => {
  it("res.status = 200, res.body.success = true, res.body.data.eligible = true and res.body.data.premiums.civil_liability = 500", done => {
    chai
      .request(index)
      .post("/v1/quote/car-insurance")
      .send({ car_value: "2000", driver_birthdate: "10/06/1990" })
      .end(function(req, res) {
        expect(res).to.have.status(200);
        expect(res.body.success).to.equal(true);
        expect(res.body.data.eligible).to.equal(true);
        expect(res.body.data.premiums.civil_liability).to.equal(500);
      });
    done();
  });
});
