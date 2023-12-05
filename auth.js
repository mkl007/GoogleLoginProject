import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
dotenv.config(); // This will load the variables from .env into process.env


export const authFunction = () => {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: "http://localhost:5000/auth/google/callback",
                passReqToCallback: true
            },
            function(request, accessToken, refreshToken, profile, done){
                done(null, profile);
                // done(null, accessToken);
            }
        )
    );

    passport.serializeUser((user, done) => {
        done(null, user)
    })

    passport.deserializeUser((user, done) => {
        done(null, user)
    })
}