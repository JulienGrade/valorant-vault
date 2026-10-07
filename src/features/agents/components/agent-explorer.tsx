"use client";

import { useState } from "react";

import { EmptyState } from "@/components/ui/empty-state";
import { AgentGrid } from "@/features/agents/components/agent-grid";
import type { AgentSummary } from "@/features/agents/types";
import {
    filterAgents,
    getAgentRoles,
} from "@/features/agents/selectors";

import styles from "./agent-explorer.module.css";

type AgentExplorerProps = {
    agents: AgentSummary[];
};

export function AgentExplorer({
                                  agents,
                              }: AgentExplorerProps) {
    const [search, setSearch] = useState("");
    const [selectedRole, setSelectedRole] = useState("");

    const roles = getAgentRoles(agents);

    const filteredAgents = filterAgents(agents, {
        search,
        role: selectedRole,
    });

    const hasActiveFilters =
        search.trim() !== "" || selectedRole !== "";

    function resetFilters() {
        setSearch("");
        setSelectedRole("");
    }

    return (
        <section className={styles.explorer}>
            <div className={styles.filters}>
                <div className={styles.field}>
                    <label htmlFor="agent-search">
                        Rechercher un agent
                    </label>

                    <input
                        id="agent-search"
                        type="search"
                        value={search}
                        placeholder="Exemple : Sage"
                        onChange={(event) => {
                            setSearch(event.target.value);
                        }}
                    />
                </div>

                <div className={styles.field}>
                    <label htmlFor="agent-role">
                        Filtrer par rôle
                    </label>

                    <select
                        id="agent-role"
                        value={selectedRole}
                        onChange={(event) => {
                            setSelectedRole(event.target.value);
                        }}
                    >
                        <option value="">Tous les rôles</option>

                        {roles.map((role) => (
                            <option value={role} key={role}>
                                {role}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    className={styles.resetButton}
                    type="button"
                    disabled={!hasActiveFilters}
                    onClick={resetFilters}
                >
                    Réinitialiser
                </button>
            </div>

            <p className={styles.resultCount} aria-live="polite">
                {filteredAgents.length}{" "}
                {filteredAgents.length > 1
                    ? "agents affichés"
                    : "agent affiché"}
            </p>

            {filteredAgents.length > 0 ? (
                <AgentGrid agents={filteredAgents} />
            ) : (
                <EmptyState
                    title="Aucun agent trouvé"
                    description="Aucun agent ne correspond à votre recherche. Essayez de modifier le nom ou le rôle sélectionné."
                    action={
                        <button
                            className="button button-primary"
                            type="button"
                            onClick={resetFilters}
                        >
                            Réinitialiser les filtres
                        </button>
                    }
                />
            )}
        </section>
    );
}