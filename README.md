# Node REST API

This is a simple REST API that compute prices and eligibility for a car insurance.

## Installation 

```sh
$ git clone REPO_NAME
$ cd REPO_NAME
$ npm install
```
## Dependencies 
- [Express.js](https://github.com/expressjs)
- [Joi](https://github.com/hapijs/joi)
- [body-parser](https://github.com/expressjs/body-parser)

## Test dependencies 

- [Mocha](https://github.com/mochajs/mocha)
- [Chai](https://github.com/chaijs/chai) and [Chai-Http](https://github.com/chaijs/chai-http)

## Description 

As this API is a micro-service, the all app is in a single file : `index.js`
The API do not store any data, so there is no database.

## How to use 

**Just make a POST request on**
`http://localhost:8080/v1/quote/car-insurance`
**with the following body parameters:**


| Key        | Value           | Description  |
| ------------- |:-------------:| -----:|
| car_value(required)      | number | Float, value of the car excl. VAT |
| driver_birthdate(required)      | string      |  Of the form "DD/MM/YYYY"  |

## Examples 

1. Using `curl` :

In the terminal, this request : 
```sh
$ curl -H "Content-Type: application/x-www-form-urlencoded" -d "car_value"="10000" -d "driver_birthdate"="21/06/1990" http://localhost:8080/v1/quote/car-insurance
```
send this response : 

```sh
{"success":true,"message":"quote successfully computed","data":{"eligible":true,"premiums":{"civil_liability":500,"omnium":"300"}}}
```

2. Using Postman :

![postman](https://user-images.githubusercontent.com/18186452/48850949-1a85ce00-edaa-11e8-89ab-977e24d78c6a.png)

## Testing

```sh
$ npm run test
```

### Contributor

[Baptiste Firket (BeCode)](https://github.com/baptistefkt)
