import { z } from "zod";

import type { ThemePreference } from "@/features/preferences/types";

export const THEME_STORAGE_KEY =
    "valorant-vault-theme";

export const THEME_CHANGED_EVENT =
    "valorant-vault-theme-changed";

const themePreferenceSchema = z.enum([
    "dark",
    "light",
    "system",
]);

export function parseThemePreference(
    value: string | null,
): ThemePreference {
    const result = themePreferenceSchema.safeParse(value);

    if (!result.success) {
        return "system";
    }

    return result.data;
}

export function saveThemePreference(
    preference: ThemePreference,
): void {
    window.localStorage.setItem(
        THEME_STORAGE_KEY,
        preference,
    );

    window.dispatchEvent(
        new Event(THEME_CHANGED_EVENT),
    );
}