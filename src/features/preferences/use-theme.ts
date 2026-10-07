"use client";

import {
    useEffect,
    useSyncExternalStore,
} from "react";

import {
    THEME_CHANGED_EVENT,
    THEME_STORAGE_KEY,
    parseThemePreference,
    saveThemePreference,
} from "@/features/preferences/theme-storage";
import type {
    ResolvedTheme,
    ThemePreference,
} from "@/features/preferences/types";

function subscribeToTheme(
    callback: () => void,
): () => void {
    window.addEventListener("storage", callback);
    window.addEventListener(
        THEME_CHANGED_EVENT,
        callback,
    );

    return () => {
        window.removeEventListener("storage", callback);
        window.removeEventListener(
            THEME_CHANGED_EVENT,
            callback,
        );
    };
}

function getThemeSnapshot(): ThemePreference {
    return parseThemePreference(
        window.localStorage.getItem(THEME_STORAGE_KEY),
    );
}

function getServerThemeSnapshot(): ThemePreference {
    return "system";
}

function subscribeToSystemTheme(
    callback: () => void,
): () => void {
    const mediaQuery = window.matchMedia(
        "(prefers-color-scheme: dark)",
    );

    mediaQuery.addEventListener("change", callback);

    return () => {
        mediaQuery.removeEventListener("change", callback);
    };
}

function getSystemThemeSnapshot(): boolean {
    return window.matchMedia(
        "(prefers-color-scheme: dark)",
    ).matches;
}

function getServerSystemThemeSnapshot(): boolean {
    return false;
}

export function useTheme() {
    const preference = useSyncExternalStore(
        subscribeToTheme,
        getThemeSnapshot,
        getServerThemeSnapshot,
    );

    const systemUsesDarkTheme = useSyncExternalStore(
        subscribeToSystemTheme,
        getSystemThemeSnapshot,
        getServerSystemThemeSnapshot,
    );

    const resolvedTheme: ResolvedTheme =
        preference === "system"
            ? systemUsesDarkTheme
                ? "dark"
                : "light"
            : preference;

    useEffect(() => {
        document.documentElement.dataset.theme =
            resolvedTheme;
    }, [resolvedTheme]);

    return {
        preference,
        resolvedTheme,
        setPreference: saveThemePreference,
    };
}