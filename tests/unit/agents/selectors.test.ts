import { describe, expect, it } from "vitest";

import {
    filterAgents,
    getAgentRoles,
} from "@/features/agents/selectors";
import type {
    AgentRole,
    AgentSummary,
} from "@/features/agents/types";

const sentinelRole: AgentRole = {
    id: "sentinel",
    name: "Sentinelle",
    description: "Protège les zones stratégiques.",
    iconUrl: null,
};

const duelistRole: AgentRole = {
    id: "duelist",
    name: "Duelliste",
    description: "Engage directement les adversaires.",
    iconUrl: null,
};

const agents: AgentSummary[] = [
    {
        id: "sage-id",
        name: "Sage",
        description:
            "Sage protège et soigne ses équipiers.",
        iconUrl: "https://example.com/sage.png",
        portraitUrl: null,
        colors: ["#ffffff"],
        role: sentinelRole,
    },
    {
        id: "jett-id",
        name: "Jett",
        description:
            "Jett utilise sa mobilité pour surprendre.",
        iconUrl: "https://example.com/jett.png",
        portraitUrl: null,
        colors: ["#5ac8fa"],
        role: duelistRole,
    },
    {
        id: "phoenix-id",
        name: "Phoenix",
        description:
            "Phoenix maîtrise les flammes.",
        iconUrl: "https://example.com/phoenix.png",
        portraitUrl: null,
        colors: ["#ff9500"],
        role: duelistRole,
    },
];

describe("filterAgents", () => {
    it("retourne tous les agents sans filtre", () => {
        const result = filterAgents(agents, {
            search: "",
            role: "",
        });

        expect(result).toEqual(agents);
    });

    it("filtre les agents par leur nom", () => {
        const result = filterAgents(agents, {
            search: "sage",
            role: "",
        });

        expect(result).toEqual([agents[0]]);
    });

    it("ignore les majuscules dans la recherche", () => {
        const result = filterAgents(agents, {
            search: "JETT",
            role: "",
        });

        expect(result).toEqual([agents[1]]);
    });

    it("recherche également dans la description", () => {
        const result = filterAgents(agents, {
            search: "flammes",
            role: "",
        });

        expect(result).toEqual([agents[2]]);
    });

    it("filtre les agents par rôle", () => {
        const result = filterAgents(agents, {
            search: "",
            role: "Duelliste",
        });

        expect(result).toEqual([
            agents[1],
            agents[2],
        ]);
    });

    it("combine la recherche et le rôle", () => {
        const result = filterAgents(agents, {
            search: "jett",
            role: "Duelliste",
        });

        expect(result).toEqual([agents[1]]);
    });

    it("retourne un tableau vide sans correspondance", () => {
        const result = filterAgents(agents, {
            search: "agent inconnu",
            role: "",
        });

        expect(result).toEqual([]);
    });
});

describe("getAgentRoles", () => {
    it("retourne les rôles uniques et triés", () => {
        const result = getAgentRoles(agents);

        expect(result).toEqual([
            "Duelliste",
            "Sentinelle",
        ]);
    });
});