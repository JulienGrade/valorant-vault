export type ThemePreference =
    | "dark"
    | "light"
    | "system";

export type ResolvedTheme =
    | "dark"
    | "light";

export type CatalogDensity =
    | "comfortable"
    | "compact";

export type CatalogDensityActionState = {
    status: "idle" | "success" | "error";
    message: string;
};