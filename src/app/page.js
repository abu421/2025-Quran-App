"use client";
import "@/styles/global.scss";
import Navbar from "@/components/navbar/navbar";
import Song from "@/components/song/song";
import AlbumList from "@/components/albumList/albumList";
import data from "@/data/albumList.json";
import Search from "@/components/search/search";
import RecentlyPlayed from "@/components/recentlyPlayed/recentlyPlayed";
import { useEffect, useState } from "react";

export default function Home() {
  const [search, setSearch] = useState(true);
  const [song, setSong] = useState(data[0]);
  const [recently, setRecently] = useState([]);

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

  function setRecentlyPlayed(obj) {
    const surah = recently.find(
      (item) => item.id === obj.id && item.title === obj.title
    );
    if (surah === undefined) {
      setRecently([...recently, obj].slice(-3));
    } else {
      return;
    }
  }

  useEffect(() => {
    if (recently.length == 0) {
      return;
    }
    localStorage.setItem("recentlyPlayed", JSON.stringify(recently));
  }, [recently]);

  useEffect(() => {
    const retrievedRecent = localStorage.getItem("recentlyPlayed");
    if (retrievedRecent !== null) {
      setRecently(JSON.parse(retrievedRecent));
    } else {
      return;
    }
  }, []);

  return (
    <>
      <Navbar toggleSearch={toggleSearch} />
      <Search
        search={search}
        toggleSearch={toggleSearch}
        lists={data}
        setSong={setSong}
        setRecentlyPlayed={setRecentlyPlayed}
      />
      <Song song={song} handlePlay={handlePlay} />
      {recently.length > 0 && (
        <RecentlyPlayed lists={data} setSong={setSong} recently={recently} />
      )}
      <AlbumList
        lists={data}
        setSong={setSong}
        setRecentlyPlayed={setRecentlyPlayed}
      />
    </>
  );
}
