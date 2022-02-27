import {
    gql,
  } from "@apollo/client";
export const POST_MESSAGE = gql`
  mutation($user: String!, $content: String!) {
    postMessage(user: $user, content: $content)
  }
`;
export const SIGNUP_USER = gql`
  mutation createUser($userNew:UserInput!) {
      user: signupUser(userNew:$userNew) {
          firstName
      }
  }
`
export const REGISTER_USER = gql`
  mutation register(
      $username: String!
      $email: String!
      $password: String!
      $confirmPassword: String!
  ) {
      register(
          registerInput: {
              username: $username
              email: $email
              password: $password
              confirmPassword: $confirmPassword
          }
      ) {
          id
          email
          username
          createdAt
          token
      }
  }
`
export const LOGIN_USER = gql`
  mutation signinUser($userSignin:UserSigninInput!) {
      user: signinUser(userSignin:$userSignin) {
          token
      }
  }
`
export const GET_ALL_QUOTES = gql`
  query getAllQuotes {
      quotes {
          name 
          by {
              _id
              firstName
          }
      }
  }
`
export const GET_USER_BY_ID = gql`
  query getUserById($userid: ID!) {
      user(_id: $userid) {
          _id
          firstName
          lastName
          email
          quotes {
              name
          }
      }
  }
`
export const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
      deletePost(postId: $postId)
  }
`
export const GET_MY_PROFILE = gql`
  query getMyProfile {
      user:myprofile {
          firstName
          lastName
          email
          quotes {
              name
          }
      }
  }
`
// lấy data realtime (websocket)
export const GET_MESSAGES = gql`
  subscription {
    messages {
      id
      content
      user
    }
  }
`;
export const UPDATE_USER = gql`
  mutation updateUser($userId: ID!, $obj: USER!) {
      updateUser(userId: $userId, obj: $obj) {
          id
          comments {
              id
              username
              createdAt
              body
          }
          commentCount
      }
  }
`