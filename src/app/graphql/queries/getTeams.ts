import gql from 'graphql-tag';

export default gql`
  query {
    getTeams {
      id
      name
      owned
    }
  }
`;
