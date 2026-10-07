"use client";

import { useState } from "react";

import { Pagination } from "@/components/ui/pagination";
import { EmptyState } from "@/components/ui/empty-state";
import { AgentGrid } from "@/features/agents/components/agent-grid";
import {
    filterAgents,
    getAgentRoles,
} from "@/features/agents/selectors";
import type {
    AgentQuery,
    AgentSummary,
} from "@/features/agents/types";

import styles from "./agent-explorer.module.css";

const AGENTS_PER_PAGE = 8;

type AgentExplorerProps = {
    agents: AgentSummary[];
};

const initialQuery: AgentQuery = {
    search: "",
    role: "",
};

export function AgentExplorer({
                                  agents,
                              }: AgentExplorerProps) {
    const [query, setQuery] =
        useState<AgentQuery>(initialQuery);
    const [page, setPage] = useState(1);

    const roles = getAgentRoles(agents);
    const filteredAgents = filterAgents(agents, query);

    const totalPages = Math.ceil(
        filteredAgents.length / AGENTS_PER_PAGE,
    );

    const currentPage = Math.min(
        page,
        Math.max(totalPages, 1),
    );

    const firstAgentIndex =
        (currentPage - 1) * AGENTS_PER_PAGE;

    const visibleAgents = filteredAgents.slice(
        firstAgentIndex,
        firstAgentIndex + AGENTS_PER_PAGE,
    );

    const hasActiveFilters =
        query.search !== "" || query.role !== "";

    const plural = filteredAgents.length !== 1;

    function updateSearch(search: string) {
        setQuery((currentQuery) => ({
            ...currentQuery,
            search,
        }));

        setPage(1);
    }

    function updateRole(role: string) {
        setQuery((currentQuery) => ({
            ...currentQuery,
            role,
        }));

        setPage(1);
    }

    function resetFilters() {
        setQuery(initialQuery);
        setPage(1);
    }

    return (
        <div className={styles.explorer}>
            <div
                className={styles.filters}
                role="search"
                aria-label="Rechercher des agents"
            >
                <label className={styles.field}>
                    <span className={styles.label}>
                        Rechercher un agent
                    </span>

                    <input
                        className={styles.control}
                        type="search"
                        value={query.search}
                        placeholder="Exemple : Sage"
                        onChange={(event) =>
                            updateSearch(
                                event.currentTarget.value,
                            )
                        }
                    />
                </label>

                <label className={styles.field}>
                    <span className={styles.label}>
                        Filtrer par rôle
                    </span>

                    <select
                        className={styles.control}
                        value={query.role}
                        onChange={(event) =>
                            updateRole(
                                event.currentTarget.value,
                            )
                        }
                    >
                        <option value="">
                            Tous les rôles
                        </option>

                        {roles.map((role) => (
                            <option value={role} key={role}>
                                {role}
                            </option>
                        ))}
                    </select>
                </label>

                <button
                    className={styles.resetButton}
                    type="button"
                    disabled={!hasActiveFilters}
                    onClick={resetFilters}
                >
                    Réinitialiser
                </button>
            </div>

            <p
                className={styles.summary}
                role="status"
                aria-live="polite"
            >
                {filteredAgents.length} agent
                {plural ? "s" : ""} trouvé
                {plural ? "s" : ""}
                {totalPages > 1
                    ? ` — page ${currentPage} sur ${totalPages}`
                    : ""}
            </p>

            {filteredAgents.length === 0 ? (
                <EmptyState
                    title="Aucun agent trouvé"
                    description="Aucun agent ne correspond à votre recherche. Modifiez les filtres ou réinitialisez-les."
                    action={
                        <button
                            className="button button--primary"
                            type="button"
                            onClick={resetFilters}
                        >
                            Réinitialiser les filtres
                        </button>
                    }
                />
            ) : (
                <div
                    className={styles.results}
                    id="agent-results"
                >
                    <AgentGrid agents={visibleAgents} />

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setPage}
                    />
                </div>
            )}
        </div>
    );
}