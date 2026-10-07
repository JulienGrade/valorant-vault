export type AgentRole = {
    id: string;
    name: string;
    description: string;
    iconUrl: string | null;
};

export type AgentSummary = {
    id: string;
    name: string;
    description: string;
    iconUrl: string;
    portraitUrl: string | null;
    colors: string[];
    role: AgentRole | null;
};

export type AgentAbility = {
    slot: string;
    name: string;
    description: string;
    iconUrl: string | null;
};

export type AgentDetail = AgentSummary & {
    abilities: AgentAbility[];
};

export type AgentQuery = {
    search: string;
    role: string;
};

export type FavoriteAgent = Pick<
    AgentSummary,
    "id" | "name" | "iconUrl" | "portraitUrl" | "role"
>;