const { Router } = require('express');
const loginRoute = Router();
const bcrypt = require('bcrypt');
const { UserModel } = require('../Models/user.model');


var count = 0;
loginRoute.post('/login', async (req, res) => {
    const { email, password } = req.body;
    var BlockedTime = Date.now();

    try {
        const user = await UserModel.find({ email });
        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, async (err, results) => {
                if (results) {
                    res.status(200).send({ msg: "Login Successful" });
                } else {
                    count++;
                    if (count == 5) {
                        await UserModel.updateOne({ email }, { $set: { BlockedTime } });
                    }
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

loginRoute.get('/get', async (req, res) => {
    var currentTime = Date.now();
    const { email } = req.headers;

    try {
        const user = await UserModel.findOne({ email });
        let BlockedTime = user.BlockedTime;
        if (currentTime - BlockedTime >= 86400000 && BlockedTime !== undefined) {
            await UserModel.updateOne({ email }, { $unset: { BlockedTime } });
            res.send({ msg: "Not Blocked" });
        } else if (currentTime - BlockedTime < 86400000 && BlockedTime !== undefined) {
            res.send({ msg: "Blocked" });
        } else {
            res.send({ msg: "Login Successful" });
        }
    } catch (err) {
        res.status(404).send({ msg: "Something went wrong😒" })
    }
});

module.exports = { loginRoute };


