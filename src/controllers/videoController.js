import routes from "../routes"
import Video from "../models/Video"
import Comment from "../models/Comment"

export const home = async (req, res) => {
    try {
        const videos = await Video.find({})
        res.render('home', {pageTitle: "Home", videos})
    } catch (error) {
        console.log(error)
        res.render('home', {pageTitle: "Home", videos: []})
    }
}
export const search = async (req, res) => {
    const {
        query: {term: searchBy}
    } = req

    let videos = []
   
    try {
        videos = await Video.find({
            title: { $regex: searchBy, $options: "i"}
        })
    } catch (error) {
        console.log(error)
    }
    res.render('search', {pageTitle: "Search", searchBy, videos})
}

export const getUpload = (req, res) => {
    res.render('upload', {pageTitle: "Upload"})
}

export const postUpload = async (req, res) => {
    const { 
        body: {title, description},
        file: {location} 
    } = req

    const newVideo = await Video.create({
        fileUrl: location,
        title,
        description,
        creator: req.user.id
    })

    req.user.videos.push(newVideo.id)
    req.user.save()

    res.redirect(routes.videoDetail(newVideo.id))
}

export const videoDetail = async (req, res) => {
    const {
        params: {id}
    } = req

    try{
        const video = await Video.findById(id).populate('creator').populate('comments') 
        //populate 는 objectID에만 쓰고 객체전체내용을가지고옴
        
        res.render('videoDetail', {pageTitle: video.title, video })
    }catch(error) {
        console.log(error)
        res.redirect(routes.home)
    }
} 

export const getEditVideo = async (req, res) => {
    const {
        params: {id}
    } = req

    try {
        const video = await Video.findById(id)
        res.render('editVideo', {pageTitle: `Edit ${video.title}`, id, video})
    }
    catch(error) {
        res.redirect(routes.home)
    }
}

export const postEditVideo = async (req, res) => {
    const { 
        params: {id},
        body: {title, description},
    } = req

    try {
        await Video.findOneAndUpdate({_id: id}, {title, description})
        res.redirect(routes.videoDetail(id))
    }catch (error) {
        res.redirect(routes.home)
    }
}

export const deleteVideo = async (req, res) => {
    const {
        params: {id}
    } = req   
    
    try {
        const video = await Video.findById(id)
        
        if (video.creator !== req.user.id){
            throw Error()
        } else {
            await Video.findOneAndDelete({_id: id})
        }
    }catch (error) {
        console.log(error)
    }
    res.redirect(routes.home)
}

//register video view

export const postRegisterView = async (req, res) => {
    const {
        params: {id}
    } = req;

    try {
        const video = await Video.findById(id)
        video.views += 1;
        video.save();
        res.status(200);
    } catch(error) {
        console.log(error)
        res.status(400);
        res.end();
    } finally {
        res.end();
    }
}

export const postAddComment = async (req, res) => {
    const {
        params: { id },
        user: { name },
        body: { comment }
    } = req;

    try {
        const video = await Video.findById(id);
        const newComment = await Comment.create({
            text: comment,
            creator: req.user.id,
            creatorName: name
        })

        console.log(req.user.name)
        video.comments.push(newComment.id)
        video.save()
        res.send(newComment)
    } catch (error) {
        console.log(error)
        res.status(400)
    } finally {
        res.end()
    }   
}

export const postDeleteComment = async (req, res) => {
    const {
        params: { id }
    } = req;

    const creator = req.user.id;

    try {
        const comment = await Comment.findOne({_id: id})
        
        if (comment.creator !== req.user.id) {
            throw Error()
        } else {
            await Comment.findOneAndDelete({_id: id})

            res.send(comment)
        }
    } catch(error) {
        console.log(error)
        res.status(400)
    } finally {
        res.end()
    }
}