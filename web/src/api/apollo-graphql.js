import ApolloClient, { gql } from 'apollo-boost';
import { connectApollo } from './apollo-mixing';
import { API_URL } from './index';

const client = new ApolloClient({
  uri: `${API_URL}/graphql`,
  fetchOptions: {
    credentials: 'include'
  },
  request: async operation => {
    operation.setContext({
      headers: {
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYzA1NWQ3YWE3ZTIwODhjMWUyNWQ2MyIsImlhdCI6MTU3Mjk1MjUyMSwiZXhwIjoxNTc1NTQ0NTIxfQ.Gl2BA75SRcct3WWcIE4fKTlNtWTSqyEgVkv9AAZZPFM'
      }
    });
  },
  onError: ({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      console.log(graphQLErrors);
    }
    if (networkError) {
      console.log(networkError);
    }
  }
});

const useApollo = viewElement => {
  return connectApollo(client)(viewElement);
};

export { useApollo, client, gql };
