import styles from "@/components/search/result.module.scss";

export default function Result({
  resultId,
  result,
  setSong,
  handleToggleSearch,
  setText,
  handleRecentlyPlayed,
}) {
  function handleChangeSong() {
    setSong(result);
    handleRecentlyPlayed({ id: result.id, title: result.title });
    handleToggleSearch();
    setText("");
  }
  return (
    <div className={styles.results} key={resultId} onClick={handleChangeSong}>
      <p>{result.title}</p>
    </div>
  );
}
