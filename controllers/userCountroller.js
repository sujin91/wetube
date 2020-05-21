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

export const githubLoginCallback = async (accessToken, refreshToken, profile, cb) => {
    const { 
        _json: {
             id, avatar_url, name, email
            }
        } = profile;

    try {
        const user = await User.findOne({email})
        
        if(user) {
            user.githubId = id;
            user.avatarUrl = avatar_url;
            user.save();
            return cb(null, user)
        }

        const newUser = await User.create({
            email,
            name,
            githubId: id,
            avatarUrl: avatar_url
        })
        return cb(null, newUser)
    }catch(error) {
        return cb(error)
    }
}
export const postGithubLogin = (req, res) => {
    res.redirect(routes.home)
}

//kakao 

export const kakaoLogin = passport.authenticate('kakao')

export const kakaoLoginCallback = async (accessToken, refreshToken, profile, cb) => {
    // console.log(accessToken, refreshToken, profile, cb)

    const {
        username,
        _json: { 
            id
        }
    } = profile;
  
    const email = profile._json.kakao_account.email;
    const avatarUrl = profile._json.properties.profile_image;

    
    
    try {
        const user = await User.findOne({email})
        
        if(user) {
            user.kakaoId = id;
            user.avatarUrl = avatarUrl;
            user.save();
            return cb(null, user)
        }

        const newUser = await User.create({
            email,
            username,
            kakaoId: id,
            avatarUrl
        })

        console.log(newUser)

        return cb(null, newUser)
    }catch(error) {
        return cb(error)
    }
}
export const postKakaoLogin = (req, res) => {
    res.redirect(routes.home)
    
}


export const logout = (req, res) => {
    // logout
    // user = null
    req.logout()
    res.redirect(routes.home)
} 

export const getMe = (req, res) => {
    res.render('userDetail', {pageTitle: "User Detail", user: req.user})
}

export const getEditProfile = (req, res) => {
    res.render('editProfile', {pageTitle: "Edit Profile"})
}

export const postEditProfile = async (req, res) => {
    const {
        body: {name, email},
        file
    } = req;
    try {
        await User.findByIdAndUpdate(req.user.id, {
            name,
            email,
            avatarUrl: file ? file.path : req.user.avatarUrl
        })
        res.redirect(routes.me)
    }catch (error){
        // res.render('editProfile', {pageTitle: "Edit Profile"})
        res.redirect(routes.editProfile)
    }
}

export const getChangePassword = (req, res) => res.render('changePassword', {pageTitle: "Change Password"})

export const postChangePassword = async (req, res) => {
    const {
        body: {oldPassword, newPassword, newPassword1}
    } = req;
    try {
        if(newPassword != newPassword1) {
            res.status(200)
            res.redirect(routes.changePassword)
            return
        }
        await req.user.changePassword(oldPassword, newPassword)
        res.redirect(routes.me)
    } catch (error) {
        res.status(200)
        res.redirect(`/users${routes.changePassword}`)
    }
}


// export const users = (req, res) => res.render('users', {pageTitle: "Users"})
export const userDetail = async (req, res) => {
    const { 
        params: { id }
    } = req;
    
    try {
        const user = await User.findById(id)
        res.render('userDetail', {pageTitle: "User Detail", user})    
    } catch(error) {
        res.redirect(routes.home)
    }
}


