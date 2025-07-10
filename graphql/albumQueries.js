import { gql } from "@apollo/client";

export const GET_ALBUMS = gql`
  query {
    albumCollection {
      items {
        sys {
          id
        }
        title
        subtitle
        genre
        artist
        image {
          ...AssetFragment
        }
        audio {
          ...AssetFragment
        }
      }
    }
  }
`;
