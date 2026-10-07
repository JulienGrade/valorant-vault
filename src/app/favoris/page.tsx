import type { Metadata } from "next";

import { FavoritesList } from "@/features/favorites/favorites-list";

export const metadata: Metadata = {
    title: "Mes favoris",
    description:
        "Retrouvez les agents Valorant enregistrés dans vos favoris.",
};

export default function FavoritesPage() {
    return (
        <main
            id="main-content"
            className="container page-section"
        >
            <header className="page-header">
                <p className="eyebrow">Votre sélection</p>

                <h1>Mes agents favoris</h1>

                <p>
                    Retrouvez rapidement les agents que vous souhaitez
                    étudier ou jouer.
                </p>
            </header>

            <FavoritesList />
        </main>
    );
}