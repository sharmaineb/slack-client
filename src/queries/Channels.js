import { gql } from '@apollo/client';

export default gql`
  query GetChannels {
    channels {
      name
      id
    }
  }
`;
