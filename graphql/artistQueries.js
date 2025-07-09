import { gql } from "@apollo/client";

export const GET_ARTISTS = gql`
  query {
    artistCollection {
      items {
        title
        options
      }
    }
  }
`;
