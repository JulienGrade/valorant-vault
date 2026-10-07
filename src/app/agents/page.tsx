import type { Metadata } from "next";

import { AgentExplorer } from "@/features/agents/components/agent-explorer";
import { getAgents } from "@/features/agents/service";

export const metadata: Metadata = {
    title: "Agents",
    description:
        "Découvrez les agents de Valorant, leurs rôles et leurs compétences.",
};

export default async function AgentsPage() {
    const agents = await getAgents();

    return (
        <main
            id="main-content"
            className="container page-section"
        >
            <header className="page-header">
                <p className="eyebrow">Base de données</p>

                <h1>Les agents Valorant</h1>

                <p>
                    Recherchez un agent et filtrez la liste selon son
                    rôle.
                </p>
            </header>

            <AgentExplorer agents={agents} />
        </main>
    );
}