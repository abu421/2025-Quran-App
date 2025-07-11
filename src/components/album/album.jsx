import styles from "@/components/album/album.module.scss";
import { Heart, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Album({
  index,
  albumId,
  song,
  className,
  setSong,
  handleRecentlyPlayed,
  hideControls = false,
  setSongIndex,
}) {
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const value = localStorage.getItem(albumId);
    if (value === "true") {
      setFavorite(true);
    } else {
      setFavorite(false);
    }
  }, [albumId]);

  function handleChangeSong() {
    setSong(song);
    setSongIndex(index);
    if (handleRecentlyPlayed) {
      handleRecentlyPlayed({
        index: index,
        id: song.sys.id,
        title: song.title,
      });
    }
  }

  function handleAddFavorite() {
    setFavorite((prevFavorite) => !prevFavorite);
    if (favorite) {
      localStorage.removeItem(albumId);
    } else {
      localStorage.setItem(albumId, !favorite);
    }
  }

  return (
    <div className={`${styles.album_container} ${className}`}>
      <div className={styles.album__details} onClick={handleChangeSong}>
        <img src={song.image.url} />
        <div className={styles.album_name}>
          <h3>{song.title}</h3>
          <p>{song.subtitle}</p>
        </div>
      </div>
      {!hideControls && (
        <div className={`${styles.album__action} `}>
          <Heart
            onClick={handleAddFavorite}
            size="20"
            className={`${favorite ? styles.favorite : ""}`}
          />
          <Plus size="20" className={styles.plus} />
        </div>
      )}
    </div>
  );
}
