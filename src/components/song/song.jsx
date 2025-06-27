import styles from "@/components/song/song.module.scss";
import { useEffect } from "react";

const Song = ({ song, audioRef, playAudio }) => {
  useEffect(() => {
    // console.log("Song: ", song);
    // console.log("Audio: ", song.audio);
    console.log(audioRef);
    if (playAudio) {
      audioRef.current.play();
    }
  }, [playAudio]);

  return (
    <div className={styles.song_container}>
      <div className={styles.song_details}>
        <img src={song.image}></img>
        <div>
          <h3>{song.title}</h3>
          <p>{song.subtitle}</p>
        </div>
      </div>
      <audio key={song.id} controls ref={audioRef}>
        <source src={song.audio} />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default Song;
