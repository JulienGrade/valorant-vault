"use client";

import styles from "./pagination.module.css";

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

export function Pagination({
                               currentPage,
                               totalPages,
                               onPageChange,
                           }: PaginationProps) {
    if (totalPages <= 1) {
        return null;
    }

    const pages = Array.from(
        { length: totalPages },
        (_, index) => index + 1,
    );

    function changePage(page: number) {
        if (
            page < 1 ||
            page > totalPages ||
            page === currentPage
        ) {
            return;
        }

        onPageChange(page);
    }

    return (
        <nav
            className={styles.pagination}
            aria-label="Pagination du catalogue"
        >
            <button
                className={styles.navigationButton}
                type="button"
                disabled={currentPage === 1}
                onClick={() => changePage(currentPage - 1)}
            >
                Précédent
            </button>

            <div className={styles.pages}>
                {pages.map((page) => (
                    <button
                        className={styles.pageButton}
                        data-active={page === currentPage}
                        type="button"
                        aria-label={`Afficher la page ${page}`}
                        aria-current={
                            page === currentPage
                                ? "page"
                                : undefined
                        }
                        onClick={() => changePage(page)}
                        key={page}
                    >
                        {page}
                    </button>
                ))}
            </div>

            <button
                className={styles.navigationButton}
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => changePage(currentPage + 1)}
            >
                Suivant
            </button>
        </nav>
    );
}