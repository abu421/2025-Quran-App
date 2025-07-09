import { gql } from "@apollo/client";
import { ASSET_FRAGMENT } from "./fragments/AssetFragments";

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
  ${ASSET_FRAGMENT}
`;
