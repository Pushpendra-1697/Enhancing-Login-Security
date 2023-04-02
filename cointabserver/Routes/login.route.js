
const { Router } = require('express');
const loginRoute = Router();
const bcrypt = require('bcrypt');
const { UserModel } = require('../Models/user.model');
// console.log(wrongAttemps);

var wrongAttemps = 5;
const { rateLimit } = require('express-rate-limit');
//API RATE LIMIT use for amount of time and no. of req valid for your application
const limiter = rateLimit({
    max: wrongAttemps, //no. of req users can make with in time
    windowMs: 60000  // time frame in (ms)
});
console.log(wrongAttemps);

loginRoute.use(limiter);

loginRoute.post('/login', async (req, res) => {
    const ip = req.ip;
    const { email, password } = req.body;

    try {
        console.log(ip);
        const user = await UserModel.find({ email });
        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, (err, results) => {
                if (results) {
                    res.status(200).send({ msg: "Login Successful" });
                } else {
                    wrongAttemps--;
                    res.status(201).send({ msg: "Wrong Password" });
                }
            });
        } else {
            res.status(201).send({ msg: "Wrong Email ID" });
        }
    } catch (err) {
        res.status(404).send({ msg: "Login failed" });
    }
});

module.exports = { loginRoute };




// app.get('/', async (req, res) => {
//     const ip = req.ip;
//     console.log(ip);
//     try {
//         res.status(200).send({ msg: "Successfully get IP" });
//     } catch (err) {
//         res.status(404).send({ Error: `Error getting IP ${err.message}` });
//     }
// });
