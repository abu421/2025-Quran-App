import { gql } from "@apollo/client";

export const ASSET_FRAGMENT = gql`
  fragment AssetFragment on Asset {
    contentType
    description
    fileName
    height
    size
    title
    url
    width
  }
`;
