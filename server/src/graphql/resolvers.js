import { userResolvers } from '../user/user.resolvers'

export const resolvers = {
  Query: {
    ...userResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
  },
  Subscription: {
    ...userResolvers.Subscription,
  },
}
