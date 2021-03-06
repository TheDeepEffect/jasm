import gql from 'graphql-tag';

export const LOG_IN = gql`
    mutation login($loginUsername: String!, $loginPassword: String!) {
        login(username: $loginUsername, password: $loginPassword) {
            ... on InvalidUser {
                message
            }
            ... on AuthPayload {
                expiresAt
                user {
                    id
                    name
                    email
                    username
                    profile_pic
                }
            }
        }
    }
`;

export const LOG_OUT = gql`
    mutation logout {
        logout {
            ... on LogoutSuccess {
                message
            }
            ... on LogoutFailed {
                message
            }
        }
    }
`;

export const SIGN_UP = gql`
    mutation signup(
        $signupName: String!
        $signupUsername: String!
        $signupEmail: String!
        $signupPassword: String!
        $signupProfilePic: String
    ) {
        signup(
            name: $signupName
            username: $signupUsername
            email: $signupEmail
            password: $signupPassword
            profile_pic: $signupProfilePic
        ) {
            ... on UserAlreadyExists {
                message
            }
            ... on AuthPayload {
                expiresAt
                user {
                    id
                    name
                    email
                    username
                    profile_pic
                }
            }
        }
    }
`;

export const CREATE_POST = gql`
    mutation createPost(
        $createPostUrl: String!
        $createPostIsPrivate: Boolean
        $createPostDescription: String
    ) {
        createPost(
            url: $createPostUrl
            isPrivate: $createPostIsPrivate
            description: $createPostDescription
        ) {
            id
            url
            description
            isPrivate
            createdAt
            author {
                username
                profile_pic
            }
            likes {
                id
                user {
                    username
                }
            }
            comments {
                id
                content
                user {
                    username
                }
            }
        }
    }
`;
export const LIKE = gql`
    mutation LikeMutation($likePostId: String!) {
        like(postId: $likePostId) {
            id
            user {
                username
            }
        }
    }
`;

export const UNLIKE = gql`
    mutation UnlikeMutation($unlikeId: String!) {
        unlike(id: $unlikeId) {
            id
        }
    }
`;

export const ADD_COMMENT = gql`
    mutation addComment(
        $addCommentContent: String!
        $addCommentPostId: String!
    ) {
        addComment(content: $addCommentContent, postId: $addCommentPostId) {
            id
            content
            user {
                username
            }
        }
    }
`;
