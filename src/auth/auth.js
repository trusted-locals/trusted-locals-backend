const { Request, Response, NextFunction } = require('express')
const jwt = require('jsonwebtoken');
const User = require('../../database/models').User;
require('dotenv').config();

async function registerUser(req, res, next) {
    const { name, email, country, password } = req.body
    if (!name || !password || !email || !country) {
        res.status(400).send({ msg: 'Missing Required Parameters' })
    }
    else {
        try {
            const user = await User.create({
                name: name,
                password: password,
                country: country,
                email: email
            })
            res.status(201).send(user)
        } catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    }
}

async function signIn(req, res, next) {
    try {
        const user = await User.findOne({
            where: {
                name: req.params.username//change to username
            }
        })
        if (!user) {
            return res.status(401).send({ message: 'Authentication failed. User not found.' })
        }
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (isMatch && !err) {
                let token = jwt.sign(JSON.parse(JSON.stringify(user)), "nodeauthsecret", { expiresIn: 86400 * 30 })
                res.status(200).cookie("jwt", token, { maxAge: 86400 * 30 }).json({ success: true, token: 'JWT ' + token })
            }
            else {
                res.status(401).send({ success: false, msg: 'Authentication failed. Wrong password.' });
            }
        })

    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
}

module.exports ={ registerUser, signIn }