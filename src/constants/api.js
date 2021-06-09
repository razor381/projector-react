const BASE_URL = 'http://localhost:3000/api';

export const SIGNUP_URL = `${BASE_URL}/auth/signup`;
export const LOGIN_URL = `${BASE_URL}/auth/login`;
export const POSTS_URL = `${BASE_URL}/posts`;
export const USERS_URL = `${BASE_URL}/users`;
export const PROFILE_URL = `${BASE_URL}/profile`;
export const COMMENTS_URL = `${BASE_URL}/comments`;
export const POST_COMMENTS_URL = (postId) => `${BASE_URL}/posts/${postId}/comments`;
