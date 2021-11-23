import { gql } from '@apollo/client'
export const CREATE_USER = gql`
  mutation createUser($input: UserInput) {
    createUser(user: $input) {
      id
      email
      createdAt
    }
  }
`
