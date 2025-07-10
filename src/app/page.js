import Home from "./_components/home";
import {
  getAlbums,
  getArtists,
  getGenres,
} from "../../service/home/home.service";

export default async function HomePage() {
  // Using Contentful Delivery API Method
  // const res = await fetch(
  //   "https://cdn.contentful.com/spaces/gyka6fv3y24t/environments/master/entries?access_token=b7j9k2z5oyV2NDezpNZMv66S0K1vIz-pdi3ZaINjhjA&content_type=album"
  // );
  // const data1 = await res.json();
  // const albums = data1.items.map((item) => item.fields);
  // console.log(albums);

  // Using graphql
  //Use promise to get all content same time. --TODO
  // const albums = await getAlbums();
  // const genres = await getGenres();
  // const artists = await getArtists();

  const [albums, genres, artists] = await Promise.all([
    getAlbums(),
    getGenres(),
    getArtists(),
  ]);

  return (
    <Home
      albums={albums}
      genres={genres[0].options}
      artists={artists[0].options}
    />
  );
}
