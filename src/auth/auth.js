// TODO: add forgot password
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { hashPassword, comparePassword, validateEmail } = require("../utils/helpers")



async function registerUser(req, res, next) {
    const { name, email, country, password } = req.body
    if (!name || !password || !email || !country) {
        res.status(400).send({ errorMessage: 'Missing Required Parameters' })
    }
    if (password.length < 8 || password.length > 64) {
        res.status(400).send({ errorMessage: "Password length must be greater than 8 and less than 64" })
    }
    if (!validateEmail(email)) {
        res.status(400).send({ errorMessage: "Invalid Email" })
    }
    if (name.length > 40 || !(/^[a-zA-Z]+$/.test(name))) {
        res.status(400).send({ errorMessage: "Name length should be less than 40 and should contain only alphabets" })
    }
    else {
        try {
            const users = req.db.collection("users");
            const user = await users.insertOne({
                name: name,
                password: hashPassword(password),
                country: country,
                email: email
            })
            let token = jwt.sign(JSON.parse(JSON.stringify(user.ops[0])), "nodeauthsecret", { expiresIn: 86400 * 30 })
            res.status(201).cookie("jwt", token, { maxAge: 86400 * 30 }).json({ success: true, token: 'JWT ' + token })
        } catch (error) {
            if (error.errmsg && error.errmsg.includes("uniqueEmail"))
                res.status(400).send({ success: false, errorMessage: "The Email address is already in use" });
            else
                res.status(400).send({ success: false, errorMessage: error.toString() });
        }
    }
}

async function signIn(req, res, next) {
    try {
        const users = req.db.collection("users");
        const user = await users.findOne({ name: req.body.name })
        if (!user) {
            return res.status(401).send({ success: false, errorMessage: 'Authentication failed.Please check your email and password' })
        }

        comparePassword(req.body.password, user.password, (err, isMatch) => {
            if (isMatch && !err) {
                let token = jwt.sign(JSON.parse(JSON.stringify(user)), "nodeauthsecret", { expiresIn: 86400 * 30 })
                res.status(200).cookie("jwt", token, { maxAge: 86400 * 30 }).json({ success: true, })
            }
            else {
                res.status(401).send({ success: false, errorMessage: 'Authentication failed. Wrong password.' });
            }
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({ errorMessage: error.toString() })
    }
}

module.exports = { registerUser, signIn }