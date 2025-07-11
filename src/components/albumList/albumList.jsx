import Album from "@/components/album/album";
import styles from "@/components/albumList/albumList.module.scss";
import { useEffect, useState, useRef } from "react";

export default function AlbumList({
  songlists,
  setSong,
  handleRecentlyPlayed,
  title,
  hideControls,
  genreOptions,
  artistOptions,
  setSongIndex,
}) {
  const [showFilter, setShowFilter] = useState(true);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const genreRef = useRef();
  const artistRef = useRef();

  useEffect(() => {
    setFilteredSongs(songlists);
  }, [songlists]);

  function handleToggleFilter() {
    setShowFilter((prevFilter) => !prevFilter);
  }

  function handleFilter(e) {
    e.preventDefault();
    const displaySongs = handleFilterMatch(
      genreRef.current.value,
      artistRef.current.value
    );
    setFilteredSongs(displaySongs);
  }

  function handleFilterMatch(genre, artist) {
    return songlists.filter((song) => {
      const matchGenre = genre === "all" || song.genre === genre;
      const matchArtist = artist === "all" || song.artist === artist;
      return matchGenre && matchArtist;
    });
    // Simplified If-Else
    // if (genre === "all" && artist === "all") {
    //   return songlists;
    // } else if (genre === "all") {
    //   return songlists.filter((song) => song.artist === artist);
    // } else if (artist === "all") {
    //   return songlists.filter((song) => song.genre === genre);
    // } else {
    //   return songlists.filter((song) => song.genre === genre && song.artist === artist);
    // }
  }

  function handleResetFilter(e) {
    e.preventDefault();
    genreRef.current.value = "all";
    artistRef.current.value = "all";
    setFilteredSongs(songlists);
  }

  return (
    <div className={styles.albumList_container}>
      <div className={styles.controls}>
        <h3>{title}</h3>
        <svg
          onClick={handleToggleFilter}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-list-filter-icon lucide-list-filter"
        >
          <path d="M3 6h18" />
          <path d="M7 12h10" />
          <path d="M10 18h4" />
        </svg>
      </div>
      <div className={`${styles.filters} ${showFilter ? styles.hidden : ""}`}>
        <label>
          Genre:
          <select name="genre" id="genre" ref={genreRef}>
            {genreOptions.map((genre, index) => {
              return (
                <option key={index} value={genre} id={index}>
                  {genre}
                </option>
              );
            })}
          </select>
        </label>
        <label>
          Artist:
          <select name="artist" id="artist" ref={artistRef}>
            {artistOptions.map((artist, index) => {
              return (
                <option key={index} value={artist} id={index}>
                  {artist}
                </option>
              );
            })}
          </select>
        </label>
        <button onClick={handleFilter}>Apply Filter</button>
        <button onClick={handleResetFilter}>Reset</button>
      </div>
      <div className={styles.AlbumContainer}>
        {filteredSongs.map((song, index) => (
          <Album
            index={index}
            key={song.sys.id}
            albumId={song.sys.id}
            song={song}
            className={styles.album_wrapper}
            setSong={setSong}
            handleRecentlyPlayed={handleRecentlyPlayed}
            hideControls={hideControls}
            setSongIndex={setSongIndex}
          />
        ))}
      </div>
    </div>
  );
}
