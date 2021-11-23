import { gql } from 'apollo-server'
import { userTypes } from '../user/user.types'

export const typeDefs = gql`
  scalar Date

  ${userTypes}
`
