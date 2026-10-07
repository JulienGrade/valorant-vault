import Link from "next/link";

import styles from "./site-footer.module.css";

export function SiteFooter() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div>
                    <strong>Valorant Vault</strong>

                    <p>
                        Application pédagogique réalisée avec Next.js
                        et TypeScript.
                    </p>
                </div>

                <nav
                    className={styles.navigation}
                    aria-label="Navigation secondaire"
                >
                    <Link href="/agents">
                        Agents
                    </Link>

                    <Link href="/favoris">
                        Favoris
                    </Link>

                    <Link href="/preferences">
                        Préférences
                    </Link>
                </nav>

                <p className={styles.disclaimer}>
                    Valorant Vault n’est pas affilié à Riot Games.
                </p>
            </div>
        </footer>
    );
}