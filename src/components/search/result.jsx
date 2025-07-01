import styles from "@/components/search/result.module.scss";
import { useEffect } from "react";

export default function Result({
  resultId,
  result,
  setSong,
  toggleSearch,
  setText,
  setRecentlyPlayed,
}) {
  function changeSong() {
    setSong(result);
    setRecentlyPlayed({ id: result.id, title: result.title });
    toggleSearch();
    setText("");
  }
  return (
    <div className={styles.results} key={resultId} onClick={changeSong}>
      <p>{result.title}</p>
    </div>
  );
}
