import gql from 'graphql-tag';

export default gql`
  mutation CreateTeam(name: String!) {
    createTeam(name: $name) {
      id
      name
      owned
    }
  }
`;
