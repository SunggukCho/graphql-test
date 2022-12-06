import { ApolloServer, gql  } from "apollo-server"

const tweets = [
  // fake db
  {
    id: "1",
    text: "Hello 1st Tweet"
  },
  {
    id: "2",
    text: "Hello 2nd Tweet"
  }
]

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
    tweet(id: ID!): Tweet
  }
  type Mutation {
    postTweet(text: String!, userId: ID!): Tweet
    deleteTweet(id: ID!): Boolean
  }
`;

const resolvers = {
  Query: {
    allTweets() {
      console.log('allTweets Query Called!')
      return tweets
    },
    tweet(root, { id }) {
      console.log(`tweet id: ${id}`)
      return tweets.find(tweet => tweet.id === id)
    }
  },
  Mutation: {
    postTweet(_, { text, userId }) {
      const newTweet = {
        id: tweets.length + 1,
        text
      }
      tweets.push(newTweet)
      return newTweet
    }
  }
}

const server = new ApolloServer({ typeDefs, resolvers })
server.listen().then(({url}) => {
  console.log(`running on url: ${url}`)
})