//Global

const HOME = "/"
const JOIN = "/join"
const LOGIN = "/login"
const LOGOUT = "/logout"
const SEARCH = "/search"

//Users

const USERS = "/users"
const USER_DETAIL = "/:id"
const EDIT_PROFILE = "/edit-profile"
const CHANGE_PASSWORD = "/change-password"
const ME = "/me"


//Videos

const VIDEO = "/videos"
const UPLOAD = "/upload"
const VIDEO_DETAIL = "/:id"
const EDIT_VIDEO = "/:id/edit"
const DELETE_VIDEO = "/:id/delete"

//github

const GITHUB = "/auth/github"
const GITHUB_CALLBACK = "/auth/github/callback"

//kakao

const KAKAO = "/auth/kakao"
const KAKAO_CALLBACK = "/auth/kakao/callback"

//api

const API = "/api"
const REGISTER_VIEW = "/:id/view"
const ADD_COMMENT = "/:id/comment"
const DELETE_COMMENT = "/:id/comment/delete"

const routes = {
    home: HOME,
    join: JOIN,
    login: LOGIN,
    logout: LOGOUT,
    search: SEARCH,
    users: USERS,
    userDetail: id => {
        if (id) {
            return `/users/${id}`
        } else {
            return USER_DETAIL
        }
    },
    editProfile: EDIT_PROFILE,
    changePassword: CHANGE_PASSWORD,
    videos: VIDEO,
    upload: UPLOAD,
    videoDetail: id => {
        if(id) {
            return `/videos/${id}`
        } else {
            return VIDEO_DETAIL
        }
    },
    editVideo: id => {
        if(id) {
            return `/videos/${id}/edit`
        } else {
            return EDIT_VIDEO
        }
    },
    deleteVideo: id => {
        if(id) {
            return `/videos/${id}/delete`
        } else {
            return DELETE_VIDEO
        }
    },
    github: GITHUB,
    githubCallback: GITHUB_CALLBACK,
    kakao: KAKAO,
    kakaoCallback: KAKAO_CALLBACK,
    me: ME,
    api : API,
    registerView: REGISTER_VIEW,
    addComment: ADD_COMMENT,
    deleteComment: DELETE_COMMENT
}

export default routes