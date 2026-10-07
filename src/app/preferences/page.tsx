import type { Metadata } from "next";

import { ThemePreferences } from "@/features/preferences/theme-preferences";

export const metadata: Metadata = {
    title: "Préférences",
    description:
        "Personnalisez l’apparence de Valorant Vault.",
};

export default function PreferencesPage() {
    return (
        <main
            id="main-content"
            className="container page-section"
        >
            <header className="page-header">
                <p className="eyebrow">Personnalisation</p>

                <h1>Préférences</h1>

                <p>
                    Adaptez l’apparence de l’application à vos
                    habitudes.
                </p>
            </header>

            <ThemePreferences />
        </main>
    );
}