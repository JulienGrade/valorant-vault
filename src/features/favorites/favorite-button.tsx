"use client";

import type { FavoriteAgent } from "@/features/agents/types";
import { useFavorites } from "@/features/favorites/use-favorites";

import styles from "./favorite-button.module.css";

type FavoriteButtonProps = {
    agent: FavoriteAgent;
};

export function FavoriteButton({
                                   agent,
                               }: FavoriteButtonProps) {
    const {
        isFavorite,
        toggleFavorite,
    } = useFavorites();

    const favorite = isFavorite(agent.uuid);

    return (
        <button
            className={`${styles.button} ${
                favorite ? styles.active : ""
            }`}
            type="button"
            aria-pressed={favorite}
            onClick={() => {
                toggleFavorite(agent);
            }}
        >
            {favorite
                ? "Retirer des favoris"
                : "Ajouter aux favoris"}
        </button>
    );
}