import { clearForm } from "./homePage.js";

const URL = " http://localhost:3030/jsonstore/collections/myboard/posts";
const URL_COMMENTS =
    "http://localhost:3030/jsonstore/collections/myboard/comments";

const mainRef = document.querySelector(".container main");
const topicBorderRef = document.querySelector(".new-topic-border");
const topicTitleRef = document.querySelector(".topic-title");
const themeContentRef = document.querySelector(".theme-content");
const themeTitleRef = themeContentRef.querySelector(".theme-title");
const commentRef = document.querySelector(".comment");
const commentFormRef = document.querySelector(".answer form");

let postID = null;

commentFormRef.addEventListener("submit", createComment);

export function showPost(e) {
    e.preventDefault();

    topicBorderRef.remove();
    topicTitleRef.remove();
    mainRef.append(themeContentRef);

    postID = e.currentTarget.getAttribute("data-id");

    fetch(`${URL}/${postID}`)
        .then((res) => res.json())
        .then((data) => {
            createPostDetails(data);
            showComments();
        })
        .catch((err) => console.error(err));
}

function showComments() {
    fetch(URL_COMMENTS)
        .then((res) => res.json())
        .then((comments) => {
            Object.entries(comments)
                .map((e) => e[1])
                .filter((e) => e.postID === postID)
                .forEach((e) => {
                    createCommentElement(e);
                });
        })
        .catch((err) => console.error(err));
}

function createCommentElement(data) {
    let newDivElement = document.createElement("div");
    newDivElement.setAttribute("id", "user-comment");
    newDivElement.innerHTML = `
        <div class="topic-name-wrapper">
            <div class="topic-name">
                <p><strong>${data.username}</strong> commented on <time>${data.date}</time></p>
                <div class="post-content">
                    <p>${data.comment}</p>
                </div>
            </div>
        </div>`;

    commentRef.append(newDivElement);
    return;
}

function createPostDetails(data) {
    let postTitle = createPostTitle(data.title);
    let postBody = createPostBody(data);
    themeTitleRef.replaceChildren(postTitle);
    commentRef.replaceChildren(postBody);
    return;
}

function createPostTitle(title) {
    let newDivElement = document.createElement("div");
    newDivElement.classList.add("theme-title");
    newDivElement.innerHTML = `
    <div class="theme-name-wrapper">
        <div class="theme-name">
            <h2>${title}</h2>

        </div>

    </div>`;

    return newDivElement;
}

function createPostBody(data) {
    let newDivElement = document.createElement("div");
    newDivElement.classList.add("header");
    newDivElement.innerHTML = `
        <img src="./static/profile.png" alt="avatar">
        <p><span>${data.username}</span> posted on <time>${data.date}</time></p>

        <p class="post-content">${data.postText}</p>`;

    return newDivElement;
}

function createComment(e) {
    e.preventDefault();
    let currentForm = e.currentTarget;
    let formData = new FormData(currentForm);
    let username = formData.get("username");
    let text = formData.get("postText");
    let date = new Date();

    if (!username || !text) {
        console.error("Please fill in all boxes");
        return;
    }

    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            text,
            date,
            postID,
        }),
    };

    fetch(URL_COMMENTS, options)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
        })
        .catch((err) => {
            console.error(err);
        });

    clearForm(currentForm);
    showComments();
}
