import gql from 'graphql-tag';

export default gql`
  mutation createTeam($name: String!) {
    createTeam(name: $name) {
      id
      name
      owned
    }
  }
`;
