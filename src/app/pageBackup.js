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

  useEffect(() => {
    const retrievedRecent = localStorage.getItem("recentlyPlayed");
    if (retrievedRecent !== null) {
      setRecently(JSON.parse(retrievedRecent));
    }
  }, []);

  const handlePlay = async (e) => {
    try {
      await e.target.play();
    } catch (ex) {
      console.log(ex);
    }
  };

  function handleToggleSearch() {
    setSearch((prevSearch) => !prevSearch);
  }

  function handleRecentlyPlayed(songObj) {
    const surah = recently.find(
      (item) => item.id === songObj.id && item.title === songObj.title
    );
    if (!surah) {
      const retrievedRecent =
        JSON.parse(localStorage.getItem("recentlyPlayed")) || [];
      const surahArray = [...retrievedRecent, songObj].slice(-3);
      console.log("surahArray", surahArray);
      localStorage.setItem("recentlyPlayed", JSON.stringify(surahArray));
      if (recently.length > 0) setRecently([...surahArray]);
    }
  }

  return (
    <>
      <Navbar handleToggleSearch={handleToggleSearch} />
      <Search
        search={search}
        handleToggleSearch={handleToggleSearch}
        songlists={data}
        setSong={setSong}
        handleRecentlyPlayed={handleRecentlyPlayed}
      />
      <Song song={song} handlePlay={handlePlay} />
      {recently.length > 0 && (
        <RecentlyPlayed
          songlists={data}
          setSong={setSong}
          recently={recently}
          hideControls={true}
        />
      )}
      <AlbumList
        songlists={data}
        setSong={setSong}
        handleRecentlyPlayed={handleRecentlyPlayed}
        title="All tracks"
        genreOptions={["all", ...new Set(data.map((song) => song.genre))]}
        artistOptions={["all", ...new Set(data.map((song) => song.artist))]}
      />
    </>
  );
}
