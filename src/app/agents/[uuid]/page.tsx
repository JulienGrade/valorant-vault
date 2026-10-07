import Link from "next/link";

type AgentDetailPageProps = {
    params: Promise<{
        uuid: string;
    }>;
};

export default async function AgentDetailPage({
                                                  params,
                                              }: AgentDetailPageProps) {
    const { uuid } = await params;

    return (
        <main
            id="main-content"
            className="container page-section"
        >
            <p className="eyebrow">Fiche dynamique</p>

            <h1>Fiche de l’agent.</h1>

            <p className="page-introduction">
                L’identifiant reçu par la route est :
            </p>

            <pre>{uuid}</pre>

            <Link
                className="button button--secondary"
                href="/agents"
            >
                Revenir aux agents
            </Link>
        </main>
    );
}