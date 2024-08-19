import { gql } from '@apollo/client';

export const signUpSchema = gql`
  mutation SignUp($firstName: String, $lastName: String, $email: String, $password: String, $confirmPassword: String) {
    signUp(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      confirmPassword: $confirmPassword
    ) {
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
