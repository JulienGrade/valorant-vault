import type {
    Metadata,
    Viewport,
} from "next";
import Script from "next/script";

import { SiteFooter } from "@/components/shell/site-footer";
import { SiteHeader } from "@/components/shell/site-header";
import { siteConfig } from "@/lib/site-config";

import "./globals.css";

export const metadata: Metadata = {
    metadataBase: siteConfig.url,

    title: {
        default: siteConfig.name,
        template: `%s | ${siteConfig.name}`,
    },

    description: siteConfig.description,

    applicationName: siteConfig.name,

    manifest: "/manifest.webmanifest",

    keywords: [
        "Valorant",
        "agents",
        "compétences",
        "favoris",
        "Next.js",
        "TypeScript",
    ],

    authors: [
        {
            name: "Valorant Vault",
        },
    ],

    creator: "Valorant Vault",

    openGraph: {
        type: "website",
        locale: siteConfig.locale,
        url: siteConfig.url,
        siteName: siteConfig.name,
        title: siteConfig.name,
        description: siteConfig.description,
    },

    twitter: {
        card: "summary_large_image",
        title: siteConfig.name,
        description: siteConfig.description,
    },

    robots: {
        index: true,
        follow: true,
    },
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,

    themeColor: [
        {
            media: "(prefers-color-scheme: dark)",
            color: "#0f1923",
        },
        {
            media: "(prefers-color-scheme: light)",
            color: "#f2f4f5",
        },
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
            lang={siteConfig.language}
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