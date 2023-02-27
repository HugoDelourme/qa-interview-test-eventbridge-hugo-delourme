const { Given, When, Then, And } = require('@cucumber/cucumber');
const { expect } = require('chai');
const request = require('supertest')('http://localhost:3000');
import { CustomWorld, ResponseData } from '../../world';

Given('An event {}', function (this: CustomWorld, request: string) {

    this.event = request;
});

When('I send POST request', async function (this: CustomWorld) {

    const response = await request
      .post("/events")
      .send(this.event)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)

    this.responseStatus = response.status;
});

When('I send GET request', async function (this: CustomWorld) {

    const response = await request
      .get("/events")
      .expect('Content-Type', /json/)
      
    this.responseStatus = response.status;
    this.responseData = response.body.data;
});

When('I send wrong POST request', async function (this: CustomWorld) {

    const response = await request
      .post("/events/test/404")
      .send(this.event)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)

    this.responseStatus = response.status;
});

When('I send GET request with wrong URL', async function (this: CustomWorld) {

    const response = await request
      .get("/events/test/404")
      .expect('Content-Type', /json/)

    this.responseStatus = response.status;
});

When('I send GET request with wrong headers', async function (this: CustomWorld) {

    const response = await request
      .get("/events/test/404")
      .set('Content-Length', 'application/json')

    this.responseStatus = response.status;
});

Then('I get response code {int}', function (this: CustomWorld, response: number) {

    expect(this.responseStatus).to.eql(response);
});

Then('the data from the response is correct', function (this: CustomWorld) {

    const responseData: {[key: string]: any} = this.responseData;

    responseData.forEach(function (responseData:{[key: string]: any}) {
      expect(responseData.name).to.be.a('string');
      expect(responseData.createdAt).to.be.a('string');
      expect(responseData.createdAt).to.have.length(51);
      expect(responseData.companyId).to.eql("ABCDEFGHIJKL");
      expect(responseData.amount).to.be.a('number');
      expect(responseData.size).to.be.a('string');
    });
});
