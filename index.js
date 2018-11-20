const express = require('express');
const Joi = require('joi');
const bodyParser = require('body-parser');
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/v1/quote/car-insurance', (req, res) => {
    res.send('Welcome to the car insurance API');
});

app.post('/api/v1/quote/car-insurance', (req, res) => {
    let date = (new Date()).toLocaleDateString('fr');
    const shema = {
        car_value: Joi.number().min(1).required(),
        driver_birthdate: Joi.string().regex(/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/).required()
    }

    const result = Joi.validate(req.body, shema);

    // const request = {
    //     "car_value": req.body.car_value,
    //     "driver_birthdate": req.body.driver_birthdate
    // };


    if (result.error) {
        res.status(400).send(
            {
                "success": false,
                "message": "parameters missing or incorrect values"
            }
        )
    } else {
        if (new Date().getFullYear() - parseInt(req.body.driver_birthdate) < 18) {
            return res.status(200).send(
                {
                    "success": true,
                    "message": "quote successfully computed",
                    "data": {
                        "eligible": false,
                    }
                }
            );
        } else if (17 < x < 26) {
            return res.status(200).send(
                {
                    "success": true,
                    "message": "quote successfully computed",
                    "data": {
                        "eligible": true,
                        "premiums": {
                            "civil_liability": 1000.00,
                            "omnium": `${(parserInt(req.body.car_value) / 100) * 3}`
                        }
                    }
                }
            );
        } else if (x > 25) {
            return res.status(200).send(
                {
                    "success": true,
                    "message": "quote successfully computed",
                    "data": {
                        "eligible": true,
                        "premiums": {
                            "civil_liability": 500.00,
                            "omnium": `${(parserInt(req.body.car_value) / 100) * 3}`
                        }
                    }
                }
            );
        }
    }

});

//PORT
const port = process.env.port || 8080;

app.listen(port, () => console.log(`Listening on port ${port}...`));