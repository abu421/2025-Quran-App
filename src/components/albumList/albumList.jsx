import Album from "@/components/album/album";
import styles from "@/components/albumList/albumList.module.scss";
import { useEffect } from "react";

export default function AlbumList({ lists, setSong, setRecentlyPlayed }) {
  return (
    <div className={styles.albumList_container}>
      <h3>All Tracks</h3>
      {lists.map((list, index) => (
        <Album
          key={list.id}
          albumId={list.id}
          list={list}
          className={styles.album_wrapper}
          setSong={setSong}
          setRecentlyPlayed={setRecentlyPlayed}
        />
      ))}
    </div>
  );
}
