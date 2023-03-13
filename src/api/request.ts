import {
  ApolloClient,
  InMemoryCache,
  // ApolloProvider,
  gql,
} from "@apollo/client";

export default new ApolloClient({
  uri: API_PATH,
  cache: new InMemoryCache(),
});
