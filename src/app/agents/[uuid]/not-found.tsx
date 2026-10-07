import Link from "next/link";

import styles from "./page.module.css";

export default function AgentNotFound() {
    return (
        <main id="main-content" className="container">
            <section className={styles.notFound}>
                <p className="eyebrow">Erreur 404</p>

                <h1>Agent introuvable</h1>

                <p>
                    Cet agent n’existe pas ou son identifiant est incorrect.
                    Vous pouvez revenir à la liste complète des agents.
                </p>

                <Link className="button button-primary" href="/agents">
                    Voir les agents
                </Link>
            </section>
        </main>
    );
}