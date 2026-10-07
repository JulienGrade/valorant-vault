import Link from "next/link";

export const metadata = {
    title: "Agents",
    description: "Découvrez les agents jouables de Valorant.",
};

export default function AgentsPage() {
    return (
        <main id="main-content" className="container page-section">
            <p className="eyebrow">Catalogue</p>

            <h1>Les agents arrivent bientôt.</h1>

            <p className="page-introduction">
                Cette page affichera prochainement les agents récupérés depuis
                Valorant-API.
            </p>

            <Link className="button button--secondary" href="/">
                Revenir à l’accueil
            </Link>
        </main>
    );
}