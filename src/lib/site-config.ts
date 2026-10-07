const siteUrl = new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
    "http://localhost:3000",
);

export const siteConfig = {
    name: "Valorant Vault",

    shortName: "Valorant Vault",

    description:
        "Explorez les agents de Valorant, découvrez leurs compétences et créez votre sélection de favoris.",

    url: siteUrl,

    locale: "fr_FR",

    language: "fr",
} as const;

export function absoluteUrl(path: string): string {
    return new URL(path, siteConfig.url).toString();
}