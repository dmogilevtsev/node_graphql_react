import {gql} from '@apollo/client'

export const NEW_USER = gql`
    subscription {
        newUser {
            id
            email
            createdAt
        }
    }
`