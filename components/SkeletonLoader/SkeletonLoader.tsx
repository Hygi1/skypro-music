import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./SkeletonLoader.module.css";

export default function SkeletonLoader() {
  return (
    <div className={styles.skeletonWrapper}>
      <div className={styles.searchSkeleton}>
        <Skeleton height={40} />
      </div>
      <Skeleton height={40} width={200} />
      <div className={styles.filterSkeleton}>
        <Skeleton width={100} height={35} />
        <Skeleton width={100} height={35} />
        <Skeleton width={100} height={35} />
      </div>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className={styles.trackSkeleton}>
          <Skeleton width={50} height={50} circle />
          <Skeleton width="60%" height={20} />
          <Skeleton width="20%" height={20} />
          <Skeleton width="15%" height={20} />
        </div>
      ))}
    </div>
  );
}
