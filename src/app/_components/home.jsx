"use client";
import Navbar from "@/components/navbar/navbar";
import Song from "@/components/song/song";
import AlbumList from "@/components/albumList/albumList";
import Search from "@/components/search/search";
import RecentlyPlayed from "@/components/recentlyPlayed/recentlyPlayed";
import { useEffect, useState } from "react";

export default function Home({ albums, genres, artists }) {
  const [search, setSearch] = useState(true);
  const [song, setSong] = useState(albums[0]);
  const [recently, setRecently] = useState([]);
  const [songIndex, setSongIndex] = useState(0);

  useEffect(() => {
    const retrievedRecent = localStorage.getItem("recentlyPlayed");
    if (retrievedRecent !== null) {
      setRecently(JSON.parse(retrievedRecent));
    }
  }, []);

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
      localStorage.setItem("recentlyPlayed", JSON.stringify(surahArray));
      if (recently.length > 0) setRecently([...surahArray]);
    }
  }

  // function handleSkipSong(direction) {
  //   const newIndex = songIndex + direction;

  //   if (newIndex >= 0 && newIndex < albums.length) {
  //     setSong(albums[newIndex]);
  //     handleRecentlyPlayed({
  //       index: newIndex,
  //       id: albums[newIndex].sys.id,
  //       title: albums[newIndex].title,
  //     });
  //     setSongIndex(newIndex);
  //   }
  // }

  function handleSkipSong(direction) {
    const total = albums.length;
    if (total === 0) return;

    let newIndex = songIndex + direction;

    // Wrap around logic
    if (newIndex >= total) {
      newIndex = 0; // Go to first song
    } else if (newIndex < 0) {
      newIndex = total - 1; // Go to last song
    }

    setSong(albums[newIndex]);
    handleRecentlyPlayed({
      index: newIndex,
      id: albums[newIndex].sys.id,
      title: albums[newIndex].title,
    });
    setSongIndex(newIndex);
  }

  return (
    <>
      <Navbar handleToggleSearch={handleToggleSearch} />
      <Search
        search={search}
        handleToggleSearch={handleToggleSearch}
        songlists={albums}
        setSong={setSong}
        handleRecentlyPlayed={handleRecentlyPlayed}
        setSongIndex={setSongIndex}
      />
      <Song song={song} handleSkipSong={handleSkipSong} />
      {recently.length > 0 && (
        <RecentlyPlayed
          songlists={albums}
          setSong={setSong}
          recently={recently}
          hideControls={true}
          setSongIndex={setSongIndex}
        />
      )}
      <AlbumList
        songlists={albums}
        setSong={setSong}
        handleRecentlyPlayed={handleRecentlyPlayed}
        title="All tracks"
        genreOptions={["all", ...genres]}
        artistOptions={["all", ...artists]}
        setSongIndex={setSongIndex}
      />
    </>
  );
}
