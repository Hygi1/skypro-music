import Search from "./Search/Search";
import Filter from "./Filter/Filter";
import Playlist from "./Playlist";
import styles from "./Centerblock.module.css";
import cn from "classnames";

export default function Centerblock() {
  return (
    <div className={styles.centerblock}>
      <Search />
      <h2 className={styles.h2}>Треки</h2>
      <Filter />
      <div className={styles.content}>
        <div className={styles.contentTitle}>
          <div className={cn(styles.playlistTitleCol, styles.col01)}>Трек</div>
          <div className={cn(styles.playlistTitleCol, styles.col02)}>
            Исполнитель
          </div>
          <div className={cn(styles.playlistTitleCol, styles.col03)}>
            Альбом
          </div>
          <div className={cn(styles.playlistTitleCol, styles.col04)}>
            <svg className={styles.playlistTitleSvg}>
              <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
            </svg>
          </div>
        </div>
        <Playlist />
      </div>
    </div>
  );
}
