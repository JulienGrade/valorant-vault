import type { ReactNode } from "react";

import styles from "./empty-state.module.css";

type EmptyStateProps = {
    title: string;
    description: string;
    action?: ReactNode;
};

export function EmptyState({
                               title,
                               description,
                               action,
                           }: EmptyStateProps) {
    return (
        <section className={styles.emptyState}>
            <div className={styles.icon} aria-hidden="true">
                ?
            </div>

            <h2>{title}</h2>

            <p>{description}</p>

            {action ? (
                <div className={styles.action}>{action}</div>
            ) : null}
        </section>
    );
}