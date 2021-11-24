export const userTypes = /* GraphQL */ `
    type User {
        id: ID
        email: String
        password: String
        createdAt: Date
        updatedAt: Date
    }

    input UserInput {
        email: String!
        password: String!
    }

    type Query {
        getAllUsers: [User]
        getUserById(id: ID!): User
        getUserByEmail(email: String!): User
        getId(id: Int): Int
    }

    type Mutation {
        createUser(user: UserInput): User
        removeUser(id: ID!): String
    }

    type Subscription {
        newUser: User
    }
`
