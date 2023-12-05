import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import { config } from './config/config.js'
// import passport from s'passport-google-oauth20'
import passport from 'passport'
import { authFunction } from './auth.js'
//require('./auth.js')
import session from 'express-session'
import path from 'path'

const app = express()


app.use(express.json());

// app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: 'true' }))
// Habilitar CORS para todas las rutas

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401)
}

// app.use(cors({
//   origin: 'http://localhost:5173',
//   //   credentials: true
// }))

app.use(session({
  secret: 'Mysecret',
  resave: false,
  saveUnitialized: true,
  cookie: { secure: false },
}))

authFunction();
app.use(passport.initialize());
app.use(passport.session());


app.get('/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }

  ));


app.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/auth/protected',
    failureRedirect: '/auth/google/failure'
  }
  ));

app.get('/auth/google/failure', (req, res) => {
  res.send('Something went wrong! :(')
});

app.get('/auth/protected', isLoggedIn, (req, res) => {
  const fullInfo = req.user;
  res.json({ fullInfo })
});

app.get('/u/profile', isLoggedIn, (req, res) => {
  const user = req.user
  res.send(user.name)
})

app.use('/auth/logout', (req, res) => {
  req.session.destroy()
  res.send('See you again!')
})

app.listen(config.port, function () {
  console.log(`Server on ${config.port}`)
})
