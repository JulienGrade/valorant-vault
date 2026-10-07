import type { Metadata } from "next";
import type { ReactNode } from "react";
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
      <html lang="fr">
      <body>{children}</body>
      </html>
  );
}