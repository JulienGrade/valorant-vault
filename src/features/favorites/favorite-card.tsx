"use client";

import Image from "next/image";
import Link from "next/link";

import type { FavoriteAgent } from "@/features/agents/types";
import { useFavorites } from "@/features/favorites/use-favorites";

import styles from "./favorite-card.module.css";

type FavoriteCardProps = {
    agent: FavoriteAgent;
};

export function FavoriteCard({
                                 agent,
                             }: FavoriteCardProps) {
    const { toggleFavorite } = useFavorites();

    return (
        <article className={styles.card}>
            <Link
                className={styles.agentLink}
                href={`/agents/${agent.uuid}`}
            >
                <div className={styles.imageContainer}>
                    <Image
                        src={agent.iconUrl}
                        alt={`Portrait de ${agent.name}`}
                        width={112}
                        height={112}
                    />
                </div>

                <div className={styles.information}>
                    <p>{agent.roleName ?? "Rôle inconnu"}</p>
                    <h2>{agent.name}</h2>
                    <span>Consulter la fiche</span>
                </div>
            </Link>

            <button
                className={styles.removeButton}
                type="button"
                aria-label={`Retirer ${agent.name} des favoris`}
                onClick={() => {
                    toggleFavorite(agent);
                }}
            >
                Retirer
            </button>
        </article>
    );
}