import styles from "@/components/search/result.module.scss";

export default function Result({
  index,
  resultId,
  result,
  setSong,
  handleToggleSearch,
  setText,
  handleRecentlyPlayed,
  setSongIndex,
}) {
  function handleSong() {
    setSong(result);
    setSongIndex(index);
    handleRecentlyPlayed({ index: index, id: resultId, title: result.title });
    handleToggleSearch();
    setText("");
  }
  return (
    <div className={styles.results} key={resultId} onClick={handleSong}>
      <p>{result.title}</p>
    </div>
  );
}
