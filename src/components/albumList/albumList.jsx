import Album from "@/components/album/album";
import styles from "@/components/albumList/albumList.module.scss";

export default function AlbumList({
  Songlists,
  setSong,
  handleRecentlyPlayed,
}) {
  return (
    <div className={styles.albumList_container}>
      <h3>All Tracks</h3>
      {Songlists.map((song, index) => (
        <Album
          key={song.id}
          albumId={song.id}
          song={song}
          className={styles.album_wrapper}
          setSong={setSong}
          handleRecentlyPlayed={handleRecentlyPlayed}
        />
      ))}
    </div>
  );
}
