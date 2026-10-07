"use client";

import { useEffect } from "react";
import Link from "next/link";

import styles from "./states.module.css";

type AgentsErrorProps = {
    error: Error & {
        digest?: string;
    };
    reset: () => void;
};

export default function AgentsError({
                                        error,
                                        reset,
                                    }: AgentsErrorProps) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <main id="main-content" className="container">
            <section className={styles.error} role="alert">
                <p className="eyebrow">Une erreur est survenue</p>

                <h1>Impossible de charger les agents</h1>

                <p>
                    Les données de Valorant sont momentanément
                    indisponibles. Vous pouvez réessayer ou revenir à
                    l’accueil.
                </p>

                <div className={styles.actions}>
                    <button
                        className="button button-primary"
                        type="button"
                        onClick={reset}
                    >
                        Réessayer
                    </button>

                    <Link className="button" href="/">
                        Retour à l’accueil
                    </Link>
                </div>
            </section>
        </main>
    );
}