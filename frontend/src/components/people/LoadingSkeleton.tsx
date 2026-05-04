import styles from "../../styles/PeoplePage.module.css";

export function LoadingSkeleton() {
  return (
    <div className={styles.skeletonStack} aria-label="Loading people data">
      {Array.from({ length: 6 }).map((_, index) => (
        <div className={styles.skeletonRow} key={index}>
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      ))}
    </div>
  );
}
