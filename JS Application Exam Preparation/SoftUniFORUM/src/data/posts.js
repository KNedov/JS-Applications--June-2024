import { get, post, put } from './api.js';

const endpoints = {
    recentPosts: '/classes/Post',
    postDetails: (postId) => `/classes/Post/${postId}?include=author`,
    postById: '/classes/Post/',
    posts: '/classes/Post'
};

export async function getRecentPosts() {
    return get(endpoints.recentPosts);
}

export async function getPostById(id) {
    return get(endpoints.postDetails(id));
}

export async function createPost(postData, authorId) {
    const record = {
        title: postData.title,
        content: postData.content,
        author: {
            __type: 'Pointer',
            className: '_User',
            objectId: authorId
        }
    };

    return post(endpoints.posts, record);
}

export async function updatePost(id, postData, authorId) {
    const record = {
        title: postData.title,
        content: postData.content,
        author: {
            __type: 'Pointer',
            className: '_User',
            objectId: authorId
        }
    };

    return put(endpoints.postById + id, record);
}