import { describe, expect, it } from "vitest";

import { parseFavorites } from "@/features/favorites/favorites-storage";

describe("parseFavorites", () => {
    it("retourne un tableau vide sans valeur", () => {
        expect(parseFavorites(null)).toEqual([]);
    });

    it("retourne un tableau vide avec un JSON invalide", () => {
        expect(
            parseFavorites("{json invalide"),
        ).toEqual([]);
    });

    it("retourne un tableau vide avec une structure invalide", () => {
        const value = JSON.stringify({
            uuid: "sage-id",
            name: "Sage",
        });

        expect(parseFavorites(value)).toEqual([]);
    });

    it("retourne les favoris valides", () => {
        const favorite = {
            uuid: "sage-id",
            name: "Sage",
            iconUrl: "https://example.com/sage.png",
            roleName: "Sentinelle",
        };

        const value = JSON.stringify([favorite]);

        expect(parseFavorites(value)).toEqual([
            favorite,
        ]);
    });

    it("accepte un agent sans rôle", () => {
        const favorite = {
            uuid: "unknown-id",
            name: "Agent inconnu",
            iconUrl: "https://example.com/agent.png",
            roleName: null,
        };

        const value = JSON.stringify([favorite]);

        expect(parseFavorites(value)).toEqual([
            favorite,
        ]);
    });
});