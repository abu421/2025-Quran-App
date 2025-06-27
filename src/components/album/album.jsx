import styles from "@/components/album/album.module.scss";
import { Heart, Plus } from "lucide-react";
import { useEffect, useState } from "react";

export default function Album({
  albumId,
  list,
  className,
  setSong,
  setPlayAudio,
}) {
  const [favorite, setFavorite] = useState(false);
  useEffect(() => {
    console.log("List: ", list);
  }, []);

  useEffect(() => {
    const value = localStorage.getItem(albumId);
    if (value === "true") {
      setFavorite(true);
    } else {
      setFavorite(false);
    }
  }, [albumId]);

  function changeSong() {
    setSong(list);
    setPlayAudio(true);
  }

  function addFavorite() {
    setFavorite((prevFavorite) => !prevFavorite);
    if (favorite) {
      localStorage.removeItem(albumId);
    } else {
      localStorage.setItem(albumId, !favorite);
    }
  }

  return (
    <div
      className={`${styles.album_container} ${className}`}
      onClick={changeSong}
    >
      <div className={styles.album__details}>
        <img src={list.image} />
        <div className={styles.album_name}>
          <h3>{list.title}</h3>
          <p>{list.subtitle}</p>
        </div>
      </div>
      <div className={styles.album__action}>
        <Heart
          onClick={addFavorite}
          size="20"
          className={`${favorite ? styles.favorite : ""}`}
        />
        <Plus size="20" className={styles.plus} />
      </div>
    </div>
  );
}
