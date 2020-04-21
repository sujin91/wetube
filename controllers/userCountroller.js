import passport from "passport"
import routes from "../routes"
import User from "../models/User"


export const getJoin = (req, res) => {
    res.render('join', {pageTitle: "Join"})
}
export const postJoin = async (req, res, next) => {
    const {
        body: {name, email, password, password2}
    } = req

    if( password != password2) {
        res.status(400)
        res.render('join', {pageTitle: "Join"})
    }
    else {
        try {
            const user =  await User({
                name,
                email
            })

            await User.register(user, password)
            next()
        } catch(error) {
            console.log(error)
        }
    }
    
}

export const getLogin = (req, res) => {
    res.render('login', {pageTitle: "Login"})
}

// export const postLogin = (req, res) => {
//     console.log(req.body)
//     res.redirect(routes.home)
// }
// 로그인 새로만들어주자.

export const postLogin = passport.authenticate('local', {
    failureRedirect: routes.login,
    successRedirect: routes.home
})

export const githubLogin = passport.authenticate('github')

export const githubLoginCallback = (accessToken, refreshToken, profile, cb) => {
    console.log(accessToken, refreshToken, profile, cb)
}

export const postGithubLogin = (req, res) => {
    res.send(routes.home)
}

export const logout = (req, res) => {
    // logout
    // user = null
    req.logout()
    res.redirect(routes.home)
} 

export const users = (req, res) => res.render('users', {pageTitle: "Users"})
export const userDetail = (req, res) => res.render('userDetail', {pageTitle: "User Detail"})
export const editProfile = (req, res) => res.render('editProfile', {pageTitle: "Edit Profile"})
export const changePassword = (req, res) => res.render('changePassword', {pageTitle: "Change Password"})

