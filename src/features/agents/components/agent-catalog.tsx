import type { AgentSummary } from "@/features/agents/types";
import { AgentExplorer } from "@/features/agents/components/agent-explorer";
import { getCatalogDensity } from "@/features/preferences/catalog-density";

import styles from "./agent-catalog.module.css";

type AgentCatalogProps = {
    agents: AgentSummary[];
};

export async function AgentCatalog({
                                       agents,
                                   }: AgentCatalogProps) {
    const density = await getCatalogDensity();

    return (
        <div
            className={styles[density]}
            data-density={density}
        >
            <AgentExplorer agents={agents} />
        </div>
    );
}