import type { Metadata } from "next";
import { Suspense } from "react";

import { AgentCatalog } from "@/features/agents/components/agent-catalog";
import { AgentGrid } from "@/features/agents/components/agent-grid";
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
                <p className="eyebrow">
                    Base de données
                </p>

                <h1>Les agents Valorant</h1>

                <p>
                    Recherchez un agent et filtrez la liste selon
                    son rôle.
                </p>
            </header>

            <Suspense
                fallback={
                    <AgentGrid agents={agents} />
                }
            >
                <AgentCatalog agents={agents} />
            </Suspense>
        </main>
    );
}