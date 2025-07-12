import styles from "@/components/song/song.module.scss";
import { useEffect, useRef, useState } from "react";
import {
  IoPlayCircleOutline,
  IoPauseCircleOutline,
  IoStopCircleOutline,
  IoPlaySkipBackCircleOutline,
  IoPlaySkipForwardCircleOutline,
} from "react-icons/io5";

const Song = ({ song, handleSkipSong }) => {
  const audioRef = useRef(null);
  const inputRangeRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState();
  const [progress, setProgress] = useState();

  useEffect(() => {
    setDuration(formatTime(audioRef.current.duration));
    setProgress(formatTime(audioRef.current.currentTime));
  }, []);

  function playSongHandler() {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }

  const handleLoadedMetadata = (e) => {
    setDuration(formatTime(audioRef.current.duration));
  };

  async function handleOnLoadedData() {
    setIsPlaying(true);
    await audioRef.current.play();
  }

  function stopSongHandler() {
    setIsPlaying(false);
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    inputRangeRef.current.value = "0";
  }

  function timeUpdateHandler() {
    setProgress(formatTime(audioRef.current.currentTime));
    inputRangeRef.current.value = Math.floor(
      (audioRef.current.currentTime / audioRef.current.duration) * 100
    );
  }

  function handleChange(e) {
    if (audioRef.current.paused) {
      audioRef.current.play();
    }
    audioRef.current.currentTime =
      (audioRef.current.duration / 100) * e.target.value;
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className={styles.song_container}>
      <div className={styles.song_details}>
        <img src={song.image.url}></img>
        <div className={styles.info}>
          <h3>{song.title}</h3>
          <p>{song.subtitle}</p>
        </div>
      </div>
      <audio
        key={song.sys.id}
        src={song.audio.url}
        ref={audioRef}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={timeUpdateHandler}
        onLoadedData={handleOnLoadedData}
      ></audio>
      <div className={styles.controls}>
        <div className={styles.progressBar}>
          <p className={styles.startingTime}>{progress}</p>
          <input
            type="range"
            ref={inputRangeRef}
            min="0"
            max="100"
            onChange={handleChange}
            defaultValue="0"
          />
          <p className={styles.endingTime}>{duration}</p>
        </div>
        <div className={styles.playControls}>
          {/* <IoPlaySkipBackCircleOutline onClick={handlePreviousSong} /> */}
          <IoPlaySkipBackCircleOutline onClick={() => handleSkipSong(-1)} />
          {isPlaying ? (
            <IoPauseCircleOutline onClick={playSongHandler} />
          ) : (
            <IoPlayCircleOutline onClick={playSongHandler} />
          )}
          <IoStopCircleOutline onClick={stopSongHandler} />
          {/* <IoPlaySkipForwardCircleOutline onClick={handleNextSong} /> */}
          <IoPlaySkipForwardCircleOutline onClick={() => handleSkipSong(1)} />
        </div>
      </div>
    </div>
  );
};

export default Song;
