import { describe, expect, it } from "vitest";

import { parseThemePreference } from "@/features/preferences/theme-storage";

describe("parseThemePreference", () => {
    it("accepte le thème sombre", () => {
        expect(
            parseThemePreference("dark"),
        ).toBe("dark");
    });

    it("accepte le thème clair", () => {
        expect(
            parseThemePreference("light"),
        ).toBe("light");
    });

    it("accepte le thème du système", () => {
        expect(
            parseThemePreference("system"),
        ).toBe("system");
    });

    it("utilise le système sans préférence", () => {
        expect(
            parseThemePreference(null),
        ).toBe("system");
    });

    it("utilise le système avec une valeur invalide", () => {
        expect(
            parseThemePreference("blue"),
        ).toBe("system");
    });
});