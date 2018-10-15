import ApolloClient from "apollo-boost";

const FaceClient = new ApolloClient({
  uri: "http://192.168.8.100:8000/graphql"
});

export default FaceClient