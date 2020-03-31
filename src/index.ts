import express, { Request, Response, NextFunction } from "express";
import bodyParser from 'body-parser'
import cors from 'cors'
import { registerUser, signIn } from "./routes/auth/auth";
import passport from "passport";
import { getToken } from "./utils/helpers";
import { passportConfig } from './passport'
passportConfig(passport);

// import { client, database } from './utils/mongo'
import mongoose from "mongoose";
import env from "dotenv";
env.config()


const frontendUrl = process.env.NODE_ENV === 'production' ? process.env.FRONTEND_URL : process.env.DEV_FRONTEND_URL;

const databaseUrl = process.env.NODE_ENV === "production" ? process.env.DATABASE_URL : process.env.DEV_DATABASE_URL;


mongoose.connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => {
    console.log("Database Connected")
  })


const app = express();
const port = process.env.NODE_ENV === 'production' ? process.env.PORT : process.env.DEV_PORT

app.use(bodyParser.json());
app.use(cors({ credentials: true, origin: frontendUrl }));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err)
  res.status(500).send('Ops! Something unexpected broke!')
})

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/user', (req, res) => {
  registerUser(req, res);
});

app.post('/user/login', (req, res) => {
  signIn(req, res);
});

app.get(
  '/test',
  passport.authenticate('jwt', { session: false }),
  (req: Request, res: Response) => {
    const token = getToken(req.headers);
    if (token) {
      res.send(req.user);
    } else {
      res.send('error');
    }
  }
);

app.listen(port, () => {
  console.log(`server started a http://localhost:${port}`);
});


