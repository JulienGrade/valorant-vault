import type { Metadata } from "next";
import { Suspense } from "react";

import { CatalogDensityForm } from "@/features/preferences/catalog-density-form";
import { getCatalogDensity } from "@/features/preferences/catalog-density";
import { ThemePreferences } from "@/features/preferences/theme-preferences";

export const metadata: Metadata = {
    title: "Préférences",

    description:
        "Personnalisez l’apparence et l’affichage de Valorant Vault.",
};

async function CatalogDensityPreferences() {
    const density = await getCatalogDensity();

    return (
        <CatalogDensityForm
            defaultDensity={density}
        />
    );
}

function CatalogDensityFallback() {
    return (
        <section aria-busy="true">
            <p>
                Chargement des préférences du catalogue…
            </p>
        </section>
    );
}

export default function PreferencesPage() {
    return (
        <main
            id="main-content"
            className="container page-section"
        >
            <header className="page-header">
                <p className="eyebrow">
                    Personnalisation
                </p>

                <h1>Préférences</h1>

                <p>
                    Adaptez l’apparence et le catalogue à vos
                    habitudes.
                </p>
            </header>

            <div
                style={{
                    display: "grid",
                    gap: "2rem",
                }}
            >
                <ThemePreferences />

                <Suspense
                    fallback={
                        <CatalogDensityFallback />
                    }
                >
                    <CatalogDensityPreferences />
                </Suspense>
            </div>
        </main>
    );
}