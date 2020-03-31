// TODO: add forgot password
import jwt from 'jsonwebtoken';
import { comparePassword, validateEmail } from "../../utils/helpers"
import { User } from "../../database/models/user";
import { Request, Response } from "express";


async function registerUser(req: Request, res: Response) {
    const { username, name, email, country, password } = req.body
    if (!username || !name || !password || !email || !country) {
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
            const user = await User.create({
                username,
                name,
                password,
                country,
                email
            })
            const token = jwt.sign(JSON.parse(JSON.stringify(user)), "nodeauthsecret", {})
            res.status(201).cookie("jwt", token, { maxAge: 86400 * 30 }).json({ success: true, token: 'JWT ' + token, user })
        } catch (error) {
            if (error.errmsg && error.code === 11000) {
                if ("username" in error.keyPattern)
                    res.status(400).send({ success: false, errorMessage: "The Username is already in use" });
                else if ("email" in error.keyPattern)
                    res.status(400).send({ success: false, errorMessage: "The Email address is already in use" });
                console.log(error)
            }
            else
                res.status(400).send({ success: false, errorMessage: error.toString() });
        }
    }
}

async function signIn(req: Request, res: Response) {
    const { username, email } = req.body
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).send({ success: false, errorMessage: 'Authentication failed.Please check your email and password' })
        }

        comparePassword(req.body.password, user.password, (err: any, isMatch: any) => {
            if (isMatch && !err) {
                const token = jwt.sign(JSON.parse(JSON.stringify(user)), "nodeauthsecret", {})
                res.status(200).cookie("jwt", token, { maxAge: 86400 * 30 }).json({ success: true, token: 'JWT ' + token, user })
            }
            else {
                res.status(401).send({ success: false, errorMessage: 'Authentication failed.Please check your email and password' });
            }
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({ errorMessage: error.toString() })
    }
}

export { registerUser, signIn }