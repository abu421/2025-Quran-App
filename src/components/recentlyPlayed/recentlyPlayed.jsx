import styles from "@/components/recentlyPlayed/recentlyPlayed.module.scss";
import { ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";
import Album from "../album/album";

const RecentlyPlayed = ({
  songlists,
  setSong,
  recently,
  hideControls,
  setSongIndex,
}) => {
  const [showRecent, setShowRecent] = useState(false);

  function handleToggleRecentPlayed() {
    setShowRecent((prevShowRecent) => !prevShowRecent);
  }

  function handleReturnSong(item) {
    const song = songlists.find(
      (list) => list.sys.id === item.id && list.title === item.title
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
                index={item.index}
                key={item.id}
                albumId={item.id}
                song={handleReturnSong(item)}
                className={styles.album_wrapper}
                setSong={setSong}
                hideControls={hideControls}
                setSongIndex={setSongIndex}
              />
            ))}
      </div>
    </div>
  );
};

export default RecentlyPlayed;
