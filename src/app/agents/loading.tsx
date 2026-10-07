import styles from "./states.module.css";

const SKELETON_COUNT = 12;

export default function AgentsLoading() {
    return (
        <main
            id="main-content"
            className="container page-section"
            aria-label="Chargement des agents"
            aria-busy="true"
        >
            <div className={styles.loadingHeader}>
                <div
                    className={styles.skeletonTitle}
                    aria-hidden="true"
                />

                <div
                    className={styles.skeletonText}
                    aria-hidden="true"
                />
            </div>

            <div className={styles.skeletonGrid} aria-hidden="true">
                {Array.from(
                    { length: SKELETON_COUNT },
                    (_, index) => (
                        <article
                            className={styles.skeletonCard}
                            key={index}
                        >
                            <div className={styles.skeletonImage} />

                            <div className={styles.skeletonContent}>
                                <div className={styles.skeletonText} />
                                <div className={styles.skeletonText} />
                            </div>
                        </article>
                    ),
                )}
            </div>
        </main>
    );
}