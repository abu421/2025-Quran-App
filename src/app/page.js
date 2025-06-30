"use client";
import "@/styles/global.scss";
import Navbar from "@/components/navbar/navbar";
import Song from "@/components/song/song";
import AlbumList from "@/components/albumList/albumList";
import data from "@/data/albumList.json";
import Search from "@/components/search/search";
// import RecentlyPlayed from "@/components/recentlyPlayed/recentlyPlayed";
import { useEffect, useState, useRef } from "react";

export default function Home() {
  const [search, setSearch] = useState(true);
  const [song, setSong] = useState(data[0]);

  const handlePlay = async (e) => {
    try {
      await e.target.play();
    } catch (ex) {
      console.log(ex);
    }
  };

  function toggleSearch() {
    setSearch((prevSearch) => !prevSearch);
  }

  return (
    <>
      <Navbar toggleSearch={toggleSearch} />
      <Search
        search={search}
        toggleSearch={toggleSearch}
        lists={data}
        setSong={setSong}
      />
      <Song song={song} handlePlay={handlePlay} />
      {/* <RecentlyPlayed /> */}
      <AlbumList lists={data} setSong={setSong} />
    </>
  );
}
