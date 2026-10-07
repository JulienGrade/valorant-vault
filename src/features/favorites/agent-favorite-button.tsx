"use client";

import type { AgentSummary } from "@/features/agents/types";
import { useFavorites } from "@/features/favorites/use-favorites";

import styles from "./agent-favorite-button.module.css";

type AgentFavoriteButtonProps = {
    agent: AgentSummary;
};

export function AgentFavoriteButton({
                                        agent,
                                    }: AgentFavoriteButtonProps) {
    const {
        isFavorite,
        toggleFavorite,
    } = useFavorites();

    const favorite = isFavorite(agent.id);

    return (
        <button
            className={`${styles.button} ${
                favorite ? styles.active : ""
            }`}
            type="button"
            aria-label={
                favorite
                    ? `Retirer ${agent.name} des favoris`
                    : `Ajouter ${agent.name} aux favoris`
            }
            aria-pressed={favorite}
            title={
                favorite
                    ? "Retirer des favoris"
                    : "Ajouter aux favoris"
            }
            onClick={() => {
                toggleFavorite({
                    uuid: agent.id,
                    name: agent.name,
                    iconUrl: agent.iconUrl,
                    roleName: agent.role?.name ?? null,
                });
            }}
        >
            <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                width="22"
                height="22"
            >
                <path d="M12 2.75 14.85 8.5l6.35.92-4.6 4.48 1.09 6.32L12 17.23l-5.69 2.99 1.09-6.32-4.6-4.48 6.35-.92L12 2.75Z" />
            </svg>
        </button>
    );
}