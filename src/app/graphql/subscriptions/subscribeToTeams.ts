import gql from 'graphql-tag';

export default gql`
  subscription {
    subscribeToTeams {
      id
      name
      owned
    }
  }
`;
