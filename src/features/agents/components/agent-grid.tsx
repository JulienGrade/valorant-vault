import { AgentCard } from "@/features/agents/components/agent-card";
import type { AgentSummary } from "@/features/agents/types";

import styles from "./agent-grid.module.css";

type AgentGridProps = {
    agents: AgentSummary[];
};

export function AgentGrid({
                              agents,
                          }: AgentGridProps) {
    return (
        <div className={styles.grid}>
            {agents.map((agent, index) => (
                <AgentCard
                    agent={agent}
                    index={index}
                    key={agent.id}
                />
            ))}
        </div>
    );
}