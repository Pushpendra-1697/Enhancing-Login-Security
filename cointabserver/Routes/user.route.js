const { Router } = require('express');
const UserRouter = Router();
const bcrypt = require('bcrypt');
const { UserModel } = require('../Models/user.model');

UserRouter.post('/register', async (req, res) => {
    const { email, password } = req.body;
    try {
        bcrypt.hash(password, 5, async (err, secure_password) => {
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

UserRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.find({ email });
        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, (err, results) => {
                if (results) {
                    res.send({ msg: "Login Successful" });
                } else {
                    res.status(201).send({ msg: "Wrong Password" });
                }
            })
        } else {
            res.status(201).send({ msg: "Wrong Email ID" });
        }  
    } catch (err) {
        res.status(404).send({ msg: "Login failed" });
    }
});

module.exports = { UserRouter };