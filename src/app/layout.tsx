import type { Metadata } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Valorant Vault",
    template: "%s | Valorant Vault",
  },
  description:
      "Découvrez les agents de Valorant, leurs rôles et leurs compétences.",
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
      <html lang="fr" suppressHydrationWarning>
      <body>
      <Script
          id="theme-initializer"
          strategy="beforeInteractive"
      >
          {`
    try {
      const preference =
        localStorage.getItem("valorant-vault-theme") ??
        "system";

      const theme =
        preference === "system"
          ? window.matchMedia(
              "(prefers-color-scheme: dark)"
            ).matches
            ? "dark"
            : "light"
          : preference;

      document.documentElement.dataset.theme = theme;
    } catch {
      document.documentElement.dataset.theme = "dark";
    }
  `}
      </Script>
      {children}</body>
      </html>
  );
}