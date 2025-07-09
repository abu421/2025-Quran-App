import Home from "./_components/home";
import client from "../../lib/apolloClient";
import { GET_ALBUMS } from "../../graphql/albumQueries";
import { GET_GENRES } from "../../graphql/genreQueries";
import { GET_ARTISTS } from "../../graphql/artistQueries";

export default async function HomePage() {
  // Using Contentful Delivery API Method
  // const res = await fetch(
  //   "https://cdn.contentful.com/spaces/gyka6fv3y24t/environments/master/entries?access_token=b7j9k2z5oyV2NDezpNZMv66S0K1vIz-pdi3ZaINjhjA&content_type=album"
  // );
  // const data1 = await res.json();
  // const albums = data1.items.map((item) => item.fields);
  // console.log(albums);

  // Using graphql
  const albumRes = await client.query({
    query: GET_ALBUMS,
  });
  const genreRes = await client.query({
    query: GET_GENRES,
  });
  const artistRes = await client.query({
    query: GET_ARTISTS,
  });

  return (
    <Home
      albums={albumRes.data.albumCollection.items}
      genres={genreRes.data.genreCollection.items[0].options}
      artists={artistRes.data.artistCollection.items[0].options}
    />
  );
}
