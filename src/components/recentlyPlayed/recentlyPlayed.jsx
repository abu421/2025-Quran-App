import styles from "@/components/recentlyPlayed/recentlyPlayed.module.scss";
import { ArrowDown } from "lucide-react";
import { useState } from "react";
import Album from "../album/album";

const RecentlyPlayed = ({ Songlists, setSong, recently }) => {
  const [showRecent, setShowRecent] = useState(false);

  function handleToggleRecentPlayed() {
    setShowRecent((prevShowRecent) => !prevShowRecent);
  }

  function handleReturnSong(item) {
    const song = Songlists.find(
      (list) => list.id === item.id && list.title === item.title
    );
    return song;
  }

  return (
    <div className={styles.recentlyContainer}>
      <div className={styles.header}>
        <h3>Recently Played</h3>
        <ArrowDown size="30" onClick={handleToggleRecentPlayed} />
      </div>
      <div className={`${styles.songs} ${showRecent ? styles.show : ""}`}>
        {recently.length > 0 &&
          recently
            .toReversed()
            .map((item) => (
              <Album
                key={item.id}
                albumId={item.id}
                song={handleReturnSong(item)}
                className={styles.album_wrapper}
                setSong={setSong}
                handleRecentlyPlayed={null}
                hideFav={styles.hide_favorite}
              />
            ))}
      </div>
    </div>
  );
};

export default RecentlyPlayed;
