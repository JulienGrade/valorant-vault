import Link from "next/link";

export const metadata = {
    title: "Favoris",
    description: "Retrouvez vos agents Valorant favoris.",
};

export default function FavoritesPage() {
    return (
        <main id="main-content" className="container page-section">
            <p className="eyebrow">Collection locale</p>

            <h1>Vos agents favoris.</h1>

            <p className="page-introduction">
                Votre sélection est encore vide. Vous pourrez bientôt ajouter des
                agents depuis le catalogue.
            </p>

            <Link className="button button--primary" href="/agents">
                Découvrir les agents
            </Link>
        </main>
    );
}