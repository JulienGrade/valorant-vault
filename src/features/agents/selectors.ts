import type {
    AgentQuery,
    AgentSummary,
} from "@/features/agents/types";

export function filterAgents(
    agents: AgentSummary[],
    query: AgentQuery,
): AgentSummary[] {
    const normalizedSearch = query.search
        .trim()
        .toLocaleLowerCase("fr");

    return agents.filter((agent) => {
        const normalizedName =
            agent.name.toLocaleLowerCase("fr");

        const normalizedDescription =
            agent.description.toLocaleLowerCase("fr");

        const matchesSearch =
            normalizedSearch === "" ||
            normalizedName.includes(normalizedSearch) ||
            normalizedDescription.includes(normalizedSearch);

        const matchesRole =
            query.role === "" ||
            agent.role?.name === query.role;

        return matchesSearch && matchesRole;
    });
}

export function getAgentRoles(
    agents: AgentSummary[],
): string[] {
    const roles = agents
        .map((agent) => agent.role?.name)
        .filter(
            (role): role is string =>
                role !== undefined,
        );

    return [...new Set(roles)].sort(
        (firstRole, secondRole) =>
            firstRole.localeCompare(secondRole, "fr"),
    );
}