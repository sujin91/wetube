import multer from 'multer'
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import routes from './routes'

const s3 = new aws.S3({
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_PRIVATE_KEY,
    region: "ap-northeast-2"
});

// const multerVideo = multer({dest: 'uploads/videos/'}) 
// const multerAvatar = multer({dest: 'uploads/avatars/'}) 
const multerVideo = multer({
    storage: multerS3({
        s3,
        acl: "public-read",
        bucket: "soodaltube/video"
    })
});

const multerAvatar = multer({
    storage: multerS3({
        s3,
        acl: "public-read",
        bucket: "soodaltube/avatar"
    })
});

export const uploadVideo = multerVideo.single("videoFile")
export const uploadAvatar = multerAvatar.single("avatar")
  
export const localMiddleWare = (req, res, next) => {
    res.locals.siteName = 'Wetube'
    res.locals.routes = routes
    res.locals.loggedUser = req.user || null
    next()
}

export const onlyPublic = (req, res, next) => {
    if(req.user) {
        res.redirect(routes.home)
    } else {
        next()
    }
}

export const onlyPrivate = (req, res, next) => {
    if(req.user) {
        next()
    } else {
        res.redirect(routes.home)
    }
}


