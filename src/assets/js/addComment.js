import axios from "axios";

const $commentForm = document.querySelector('#jsAddComment');
const $commentInput = document.querySelector('#jsAddComment input');
const $commentList = document.querySelector('#jsCommentList');
const $commentNumber = document.querySelector('#jsCommentNumber em');

function init() {
    $commentForm.addEventListener('submit', handleSubmit);

    setState();
}

const handleDeleteComment = e => {
    const $li = e.target.closest('li')
    $li.remove();
    sendDeleteComment($li);
}

const sendDeleteComment = async ($li) => {
    //지우는 api 호출
    const videoId = window.location.pathname.split('/videos/')[1];

    const response = await axios({
        url: `/api/${$li.id}/comment/delete`,
        method: "POST",
    })

    if(response.status === 200) {
        deleteComment($li);
        minusCommentNumber();
    }
}

const deleteComment = $li => {
    $li.remove();
    setState();
}

const handleSubmit = (e) => {
    e.preventDefault();
    const comment = $commentInput.value;
    sendComment(comment);
    $commentInput.value = '';
}

const sendComment = async (comment) => {
    const videoId = window.location.pathname.split('/videos/')[1];
    const response = await axios({
        url: `/api/${videoId}/comment`,
        method: "POST",
        data: {
            comment
        }
    })

    const {
        data: { creatorName, _id }
    } = response;

    if(response.status === 200) {
        addComment(comment, creatorName, _id);
        addCommentNumber();
    }
}

const addComment = (comment, creatorName, id) => {
    const $li = document.createElement('li');
    const $commentName = document.createElement('em');
    const $commentText = document.createElement('span');
    const $btnCommentDel = document.createElement('button');

    $commentName.className = 'comment_name'
    $commentText.className = 'comment_text'
    $btnCommentDel.className = 'btn_comment_delete'

    $commentName.innerHTML = creatorName;
    $commentText.innerHTML = comment;
    $btnCommentDel.innerHTML = `<i class="fas fa-minus-circle"></i>`

    $li.appendChild($commentName);
    $li.appendChild($commentText);
    $li.appendChild($btnCommentDel);
    $li.id = id;

    $commentList.prepend($li);
    setState();
}

const setState = () => {
    const $btnDeleteCommentList = document.querySelectorAll('.btn_comment_delete');

    $btnDeleteCommentList.forEach(btnDeleteComment => {
        btnDeleteComment.addEventListener('click', handleDeleteComment);
    })
}

const addCommentNumber = () => {
    $commentNumber.innerHTML = parseInt($commentNumber.innerHTML, 10) + 1;
}

const minusCommentNumber = () => {
    $commentNumber.innerHTML = parseInt($commentNumber.innerHTML, 10) - 1;
}

if($commentForm) {
    init();
}