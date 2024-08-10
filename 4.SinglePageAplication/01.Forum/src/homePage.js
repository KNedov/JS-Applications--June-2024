import { showPost } from "./postPage.js";

const URL = " http://localhost:3030/jsonstore/collections/myboard/posts";

const formElement = document.querySelector("main form");
const topicContainerDiv = document.querySelector(".topic-container");
const mainRef = document.querySelector(".container main");
const topicBorderRef = document.querySelector(".new-topic-border");
const topicTitleRef = document.querySelector(".topic-title");
const themeContentRef = document.querySelector(".theme-content");

formElement.addEventListener("submit", createPost);

topicBorderRef.remove();
topicTitleRef.remove();
themeContentRef.remove();

export function loadPosts() {
    themeContentRef.remove();
    mainRef.append(topicBorderRef, topicTitleRef);

    topicContainerDiv.replaceChildren();

    fetch(URL)
        .then((res) => res.json())
        .then((data) => {
            Object.entries(data).forEach((e) => {
                let postData = e[1];
                let postElement = createPostElement(postData);
                topicContainerDiv.append(postElement);
            });
        })
        .catch((err) => console.error(err));
}

function createPostElement(postData) {
    let newPostEl = document.createElement("div");
    newPostEl.classList.add("topic-name-wrapper");
    newPostEl.innerHTML = `
        <div class="topic-name">
            <a href="#" class="normal" data-id="${postData._id}">
                <h2>${postData.title}</h2>
            </a>
            <div class="columns">
                <div>
                    <p>
                        Date: <time>${postData.date}</time>
                    </p>
                    <div class="nick-name">
                        <p>
                            Username: <span>${postData.username}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        `;

    newPostEl.querySelector("a").addEventListener("click", showPost);

    return newPostEl;
}

function createPost(e) {
    e.preventDefault();

    let targetButton = e.submitter;
    if (targetButton.classList.contains("cancel")) {
        clearForm(e.currentTarget);
        return;
    }

    let currentForm = e.currentTarget;
    let formData = new FormData(currentForm);

    let title = formData.get("topicName");
    let username = formData.get("username");
    let content = formData.get("postText");
    let date = new Date();

    if (!title || !username || !content) {
        console.error("Please fill every box");
        return;
    }

    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title,
            username,
            content,
            date,
        }),
    };

    fetch(URL, options)
        .then((res) => res.json())
        .then((body) => {
            topicContainerDiv.replaceChildren();
            loadPosts();
        })
        .catch((err) => console.error(err));

    clearForm(currentForm);
}

export function clearForm(form) {
    form.reset();
}
