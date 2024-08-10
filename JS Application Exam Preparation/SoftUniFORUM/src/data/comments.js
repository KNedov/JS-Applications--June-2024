import { createPointer, get, post, put } from './api.js';

const endpoints = {
    comments: '/classes/Comment',
    commentsByPostId: (postId) => `/classes/Comment?where=${encodeURIComponent(JSON.stringify({post: createPointer('Post', postId)}))}&include=author`
};

export async function getCommentsByPostId(postId) {
    return get(endpoints.commentsByPostId(postId));
}

export async function createComment(content, postId, authorId) {
    const record = {
        content,
        post: createPointer('Post', postId),
        author: createPointer('_User', authorId)
    };

    return post(endpoints.comments, record);
}