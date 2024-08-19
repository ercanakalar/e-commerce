import { gql } from '@apollo/client';

export const signInSchema = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      message
      data {
        id
        firstName
        lastName
        email
      }
      token
    }
  }
`;
