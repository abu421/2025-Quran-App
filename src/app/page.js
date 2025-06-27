"use client";
import "@/styles/global.scss";
import Navbar from "@/components/navbar/navbar";
import Song from "@/components/song/song";
import AlbumList from "@/components/albumList/albumList";
import data from "@/data/albumList.json";
import Search from "@/components/search/search";
import { useEffect, useState, useRef } from "react";

export default function Home() {
  const [search, setSearch] = useState(true);
  const [song, setSong] = useState(data[0]);
  const audioRef = useRef(null);
  const [playAudio, setPlayAudio] = useState(false);

  useEffect(() => {
    //Printing Data on first render
    console.log("data: ", data);
  }, []);

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
        setPlayAudio={setPlayAudio}
      />
      <Song song={song} audioRef={audioRef} playAudio={playAudio} />
      <AlbumList lists={data} setSong={setSong} setPlayAudio={setPlayAudio} />
    </>
  );
}
