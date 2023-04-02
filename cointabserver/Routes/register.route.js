const { Router } = require('express');
const registerRoute = Router();
const { UserModel } = require('../Models/user.model');
require('dotenv').config();
const bcrypt = require('bcrypt');

registerRoute.post('/register', async (req, res) => {
    const { email, password } = req.body;
    try {
        bcrypt.hash(password, +(process.env.Salt_rounds), async (err, secure_password) => {
            if (err) {
                console.log(err);
            } else {
                const user = new UserModel({ email, password: secure_password });
                await user.save();
                res.status(201).send({ msg: 'Registered Successfully' });
            }
        })
    } catch (err) {
        res.status(404).send({ msg: "Registation failed" });
    }
});

module.exports = { registerRoute };