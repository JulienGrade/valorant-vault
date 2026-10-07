"use client";

import {
    useCallback,
    useSyncExternalStore,
} from "react";

import type { FavoriteAgent } from "@/features/agents/types";
import {
    FAVORITES_CHANGED_EVENT,
    FAVORITES_STORAGE_KEY,
    parseFavorites,
    saveFavorites,
} from "@/features/favorites/favorites-storage";

const EMPTY_FAVORITES: FavoriteAgent[] = [];

let cachedValue: string | null | undefined;
let cachedFavorites: FavoriteAgent[] = EMPTY_FAVORITES;

function getFavoritesSnapshot(): FavoriteAgent[] {
    const storedValue = window.localStorage.getItem(
        FAVORITES_STORAGE_KEY,
    );

    if (storedValue === cachedValue) {
        return cachedFavorites;
    }

    cachedValue = storedValue;
    cachedFavorites = parseFavorites(storedValue);

    return cachedFavorites;
}

function getServerSnapshot(): FavoriteAgent[] {
    return EMPTY_FAVORITES;
}

function subscribeToFavorites(
    callback: () => void,
): () => void {
    window.addEventListener("storage", callback);
    window.addEventListener(
        FAVORITES_CHANGED_EVENT,
        callback,
    );

    return () => {
        window.removeEventListener("storage", callback);
        window.removeEventListener(
            FAVORITES_CHANGED_EVENT,
            callback,
        );
    };
}

export function useFavorites() {
    const favorites = useSyncExternalStore(
        subscribeToFavorites,
        getFavoritesSnapshot,
        getServerSnapshot,
    );

    const isFavorite = useCallback(
        (uuid: string): boolean =>
            favorites.some(
                (favorite) => favorite.uuid === uuid,
            ),
        [favorites],
    );

    const toggleFavorite = useCallback(
        (agent: FavoriteAgent): void => {
            const currentFavorites = getFavoritesSnapshot();

            const alreadyFavorite = currentFavorites.some(
                (favorite) => favorite.uuid === agent.uuid,
            );

            const nextFavorites = alreadyFavorite
                ? currentFavorites.filter(
                    (favorite) => favorite.uuid !== agent.uuid,
                )
                : [...currentFavorites, agent];

            saveFavorites(nextFavorites);
        },
        [],
    );

    return {
        favorites,
        isFavorite,
        toggleFavorite,
    };
}