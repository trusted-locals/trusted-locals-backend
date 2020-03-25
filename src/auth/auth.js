const { Request, Response, NextFunction } = require('express')
const jwt = require('jsonwebtoken');
require('dotenv').config();
const client = require("../utils/mongo");
const { hashPassword, comparePassword } = require("../utils/helpers")

async function registerUser(req, res, next) {
    const { name, email, country, password } = req.body
    if (!name || !password || !email || !country) {
        res.status(400).send({ errorMessage: 'Missing Required Parameters' })
    }
    else {
        try {
            const users = client.db("trusted_locals").collection("users");
            users.insert({
                name: name,
                password: hashPassword(password),
                country: country,
                email: email
            })
            res.status(201).json({ success: true })
        } catch (error) {
            console.log(error);
            res.status(400).send({ success: false, errorMessage: error });
        }
    }
}

async function signIn(req, res, next) {
    try {
        const users = client.db("trusted_locals").collection("users");
        const user = await users.findOne({ name: req.body.name })
        console.log(user)
        if (!user) {
            return res.status(401).send({ success: false, errorMessage: 'Authentication failed. User not found.' })
        }

        comparePassword(req.body.password, user.password, (err, isMatch) => {
            if (isMatch && !err) {
                let token = jwt.sign(JSON.parse(JSON.stringify(user)), "nodeauthsecret", { expiresIn: 86400 * 30 })
                res.status(200).cookie("jwt", token, { maxAge: 86400 * 30 }).json({ success: true, token: 'JWT ' + token })
            }
            else {
                res.status(401).send({ success: false, errorMessage: 'Authentication failed. Wrong password.' });
            }
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({ errorMessage: error })
    }
}

module.exports = { registerUser, signIn }