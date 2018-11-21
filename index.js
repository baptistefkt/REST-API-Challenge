const express = require('express');
const bodyParser = require('body-parser');
const Joi = require('joi');

// Initialize the app
const app = express();

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

// ROUTES 
app.get('/', (req, res) => {
    res.send('This API is made with Node.js + Express.js');
});

app.get('/v1/quote/car-insurance', (req, res) => {
    res.send('Welcome to the car insurance API');
});

app.post('/v1/quote/car-insurance', (req, res) => {

    // shema to validate params send by the user
    const shema = {
        car_value: Joi.number().min(99).required(),
        driver_birthdate: Joi.string().regex(/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/).required()
    }

    const result = Joi.validate(req.body, shema);

    if (result.error || !req.body.car_value || !req.body.driver_birthdate) {
        res.status(400).send(
            {
                "success": false,
                "message": "parameters missing or incorrect values"
            }
        )
    } else {

        // date and age formating 
        function formatDate(str) {
            const splitedDate = str.split(/\//);
            const formatedDate = [splitedDate[1], splitedDate[0], splitedDate[2]].join('/');
            return formatedDate;
        }

        function msAge(date) {
            const ageMs = new Date() - new Date(date);
            return ageMs;
        }

        function msToYear(ms) {
            const year = ms / 31557600000; // = (365.25 * 24 * 60 * 60 * 1000)
            return year;
        }

        let userAge = msToYear(msAge(formatDate(req.body.driver_birthdate)));


        if (userAge < 18) {
            return res.status(200).send(
                {
                    "success": true,
                    "message": "quote successfully computed",
                    "data": {
                        "eligible": false,
                    }
                }
            );
        } else if (18 <= userAge && userAge < 26) {
            return res.status(200).send(
                {
                    "success": true,
                    "message": "quote successfully computed",
                    "data": {
                        "eligible": true,
                        "premiums": {
                            "civil_liability": 1000.00,
                            "omnium": `${(Number(req.body.car_value) / 100) * 3}`
                        }
                    }
                }
            );
        } else if (userAge >= 26) {
            return res.status(200).send(
                {
                    "success": true,
                    "message": "quote successfully computed",
                    "data": {
                        "eligible": true,
                        "premiums": {
                            "civil_liability": 500.00,
                            "omnium": `${(Number(req.body.car_value) / 100) * 3}`
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

module.exports = app; //export modules for testing units
