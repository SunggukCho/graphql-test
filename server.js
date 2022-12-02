import { ApolloServer, gql  } from "apollo-server"

const typeDefs = gql`
  type User {
    id: ID
    username: String
  }
  type Tweet {
    id: ID
    text: String
    author: User
  }
  type Query {
    allTweets: [Tweet]
    tweet(id: ID): Tweet
  }
  type Mutation {
    postTweet(text: String, userId: ID!): Tweet
    deleteTweet(id: ID!): Boolean
  }
`;

const resolvers = {
  Query: {
    tweet() {
      console.log('Tweet Query Called!')
      return null
    }
  }
}

const server = new ApolloServer({ typeDefs, resolvers })
server.listen().then(({url}) => {
  console.log(`running on url: ${url}`)
})