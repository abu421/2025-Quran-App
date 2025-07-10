import { gql } from "@apollo/client";
import client from "../../lib/apolloClient";
import { ASSET_FRAGMENT } from "../../graphql/fragments/AssetFragments";
import { GET_ALBUMS } from "../../graphql/albumQueries";
import { GET_GENRES } from "../../graphql/genreQueries";
import { GET_ARTISTS } from "../../graphql/artistQueries";

export async function getAlbums() {
  const query = gql`
    ${ASSET_FRAGMENT}
    ${GET_ALBUMS}
  `;
  const albumRes = await client.query({
    query,
  });
  return albumRes.data.albumCollection.items;
}

export async function getGenres() {
  const query = gql`
    ${GET_GENRES}
  `;
  const genreRes = await client.query({
    query,
  });
  return genreRes.data.genreCollection.items;
}

export async function getArtists() {
  const query = gql`
    ${GET_ARTISTS}
  `;
  const artistRes = await client.query({
    query,
  });
  return artistRes.data.artistCollection.items;
}
