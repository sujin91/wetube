import passport from "passport"
import githubStrategy from "passport-github"
import kakaoStrategy from "passport-kakao"
import User from "./models/User"
import { githubLoginCallback, kakaoLoginCallback } from "./controllers/userCountroller";
import routes from "./routes"

passport.use(User.createStrategy())

passport.use(
    new kakaoStrategy({
        clientID: process.env.KAKAO_ID,
        callbackURL: process.env.PRODUCTION
        ? `https://boiling-sands-42700.herokuapp.com${routes.kakaoCallback}`
        : `http://localhost:4000${routes.kakaoCallback}`
    }, kakaoLoginCallback) 
)

passport.use(
    new githubStrategy({
        clientID: process.env.GH_ID,
        clientSecret: process.env.GH_SECRET,
        callbackURL: process.env.PRODUCTION
        ? `https://boiling-sands-42700.herokuapp.com${routes.githubCallback}`
        : `http://localhost:4000${routes.githubCallback}`
    }, githubLoginCallback) 
)

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
