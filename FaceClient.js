import ApolloClient from "apollo-boost";

const GRAPHQL_URL = process.env.GRAPHQL_URL

console.log(GRAPHQL_URL)

const FaceClient = new ApolloClient({
  uri: GRAPHQL_URL
});

export default FaceClient