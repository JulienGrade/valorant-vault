import type { Metadata } from "next";
import Script from "next/script";

import { SiteFooter } from "@/components/shell/site-footer";
import { SiteHeader } from "@/components/shell/site-header";

import "./globals.css";

export const metadata: Metadata = {
    title: {
        default: "Valorant Vault",
        template: "%s | Valorant Vault",
    },

    description:
        "Explorez les agents de Valorant, découvrez leurs compétences et créez votre sélection de favoris.",

    applicationName: "Valorant Vault",

    keywords: [
        "Valorant",
        "agents",
        "compétences",
        "Next.js",
        "TypeScript",
    ],
};

type RootLayoutProps = Readonly<{
    children: React.ReactNode;
}>;

export default function RootLayout({
                                       children,
                                   }: RootLayoutProps) {
    return (
        <html
            lang="fr"
            suppressHydrationWarning
        >
        <body>
        <Script
            id="theme-initializer"
            strategy="beforeInteractive"
        >
            {`
            try {
              const preference =
                localStorage.getItem(
                  "valorant-vault-theme"
                ) ?? "system";

              const theme =
                preference === "system"
                  ? window.matchMedia(
                      "(prefers-color-scheme: dark)"
                    ).matches
                    ? "dark"
                    : "light"
                  : preference;

              document.documentElement.dataset.theme =
                theme;
            } catch {
              document.documentElement.dataset.theme =
                "dark";
            }
          `}
        </Script>

        <SiteHeader />

        {children}

        <SiteFooter />
        </body>
        </html>
    );
}