const express = require('express');
const bodyParser =require('body-parser')
const {registerUser,signIn} =require('./auth/auth')
const passport=require("passport")
const {getToken}=require("./helpers/helpers")
require('../passport')(passport);

const app = express();
const port = 8080;

app.use(bodyParser.json());

app.get( "/", ( req, res ) => {
    res.send("Hello World")
} );

app.post("/user",(req,res)=>{
    registerUser(req,res)
});

app.post("/user/login",(req,res)=>{
    signIn(req,res)
})

app.get("/test",passport.authenticate('jwt', { session: false}),(req,res)=>{
    var token = getToken(req.headers);
    if (token) {
        res.send("authenticated successfully")
    } else {
        res.send("error")
    }
})

app.listen( port, () => {
    console.log( `server started a http://localhost:${ port }` );
} );


