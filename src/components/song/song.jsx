import styles from "@/components/song/song.module.scss";

const Song = ({ song, handlePlay }) => {
  return (
    <div className={styles.song_container}>
      <div className={styles.song_details}>
        <img src={song.image.url}></img>
        <div className={styles.info}>
          <h3>{song.title}</h3>
          <p>{song.subtitle}</p>
        </div>
      </div>
      <audio key={song.sys.id} controls onCanPlay={handlePlay}>
        <source src={song.audio.url} />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default Song;
