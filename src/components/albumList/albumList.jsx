import Album from "@/components/album/album";
import styles from "@/components/albumList/albumList.module.scss";
import { useEffect } from "react";

export default function AlbumList({ lists, setSong, setPlayAudio }) {
  useEffect(() => {
    console.log("Lists: ", lists);
  }, []);
  return (
    <div className={styles.albumList_container}>
      {lists.map((list, index) => (
        <Album
          key={list.id}
          albumId={list.id}
          list={list}
          className={styles.album_wrapper}
          setSong={setSong}
          setPlayAudio={setPlayAudio}
        />
      ))}
    </div>
  );
}
