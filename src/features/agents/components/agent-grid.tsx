import type { AgentSummary } from "../types";
import { AgentCard } from "./agent-card";
import styles from "./agent-grid.module.css";

type AgentGridProps = {
    agents: AgentSummary[];
};

export function AgentGrid({ agents }: AgentGridProps) {
    return (
        <div className={styles.grid}>
            {agents.map((agent) => (
                <AgentCard
                    key={agent.id}
                    agent={agent}
                />
            ))}
        </div>
    );
}