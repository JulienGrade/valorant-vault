import { z } from "zod";

import type { FavoriteAgent } from "@/features/agents/types";

export const FAVORITES_STORAGE_KEY =
    "valorant-vault-favorites";

export const FAVORITES_CHANGED_EVENT =
    "valorant-vault-favorites-changed";

const favoriteAgentSchema = z.object({
    uuid: z.string(),
    name: z.string(),
    iconUrl: z.string(),
    roleName: z.string().nullable(),
});

const favoriteListSchema = z.array(favoriteAgentSchema);

export function parseFavorites(
    value: string | null,
): FavoriteAgent[] {
    if (!value) {
        return [];
    }

    try {
        const json: unknown = JSON.parse(value);
        const result = favoriteListSchema.safeParse(json);

        if (!result.success) {
            return [];
        }

        return result.data;
    } catch {
        return [];
    }
}

export function saveFavorites(
    favorites: FavoriteAgent[],
): void {
    window.localStorage.setItem(
        FAVORITES_STORAGE_KEY,
        JSON.stringify(favorites),
    );

    window.dispatchEvent(
        new Event(FAVORITES_CHANGED_EVENT),
    );
}