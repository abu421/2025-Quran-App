import styles from "@/components/recentlyPlayed/recentlyPlayed.module.scss";
import { ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";

const RecentlyPlayed = ({ lists, setSong, recently }) => {
  const [showRecent, setShowRecent] = useState(false);

  function showRecentPlayed() {
    setShowRecent((prevShowRecent) => !prevShowRecent);
  }

  function playSong(e) {
    const song = lists.find((list) => list.title === e.target.innerText);
    // console.log(song);
    setSong(song);
  }

  return (
    <div className={styles.recentlyContainer}>
      <div className={styles.header}>
        <h3>Recently Played</h3>
        <ArrowDown size="30" onClick={showRecentPlayed} />
      </div>
      <div className={`${styles.songs} ${showRecent ? styles.show : ""}`}>
        {/* <p className={styles.names} onClick={playSong}>
          Surah Al-Fatiha
        </p>
        <p className={styles.names} onClick={playSong}>
          Surah Al-Baqarah
        </p>
        <p className={styles.names} onClick={playSong}>
          Surah Maryam
        </p> */}
        {recently.length > 0 &&
          recently.map((item) => (
            <p className={styles.names} onClick={playSong} key={item.id}>
              {item.title}
            </p>
          ))}
      </div>
    </div>
  );
};

export default RecentlyPlayed;
