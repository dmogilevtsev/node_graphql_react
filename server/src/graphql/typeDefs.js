import { mergeTypeDefs } from '@graphql-tools/merge'
import { userTypes } from '../user/user.types'

const schema = /* GraphQL */`
    schema {
        query: Query
        mutation: Mutation
    }
`

const types = [ userTypes, schema ]

export const typeDefs = mergeTypeDefs(types)
