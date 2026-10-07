import type { Metadata } from "next";

import { AgentGrid } from "@/features/agents/components/agent-grid";
import { getAgents } from "@/features/agents/service";

export const metadata: Metadata = {
    title: "Agents",
    description:
        "Découvrez les agents jouables de Valorant et leurs rôles.",
};

export default async function AgentsPage() {
    const agents = await getAgents();

    return (
        <main
            id="main-content"
            className="container page-section"
        >
            <header className="catalog-heading">
                <p className="eyebrow">Protocole Valorant</p>

                <h1>Choisissez votre agent.</h1>

                <p className="page-introduction">
                    Découvrez les agents jouables, leurs rôles et
                    leurs spécialités. Sélectionnez une carte pour
                    consulter prochainement toutes ses compétences.
                </p>
            </header>

            <p
                className="result-summary"
                aria-live="polite"
            >
                {agents.length} agent
                {agents.length > 1 ? "s" : ""} disponible
                {agents.length > 1 ? "s" : ""}
            </p>

            <AgentGrid agents={agents} />
        </main>
    );
}