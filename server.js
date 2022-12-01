import { ApolloServer, gql  } from "apollo-server"

const typeDefs = gql`
  type User {
    id: ID
    username: string
  }
  type Tweet {
    id: ID
    text: string
    author: User
  }
  type Query {
    allTweets: [Tweet]
    tweet(id: ID): Tweet
  }
`;

const server = new ApolloServer({ typeDefs })
server.listen().then(({url}) => {
  console.log(`running on url: ${url}`)
})