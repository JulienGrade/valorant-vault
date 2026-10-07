import type {
    AgentAbilityDto,
    AgentDto,
    AgentRoleDto,
} from "./schemas";

import type {
    AgentAbility,
    AgentDetail,
    AgentRole,
    AgentSummary,
} from "./types";

function toCssColor(color: string): string {
    return color.startsWith("#") ? color : `#${color}`;
}

function toAgentRole(role: AgentRoleDto | null): AgentRole | null {
    if (!role) {
        return null;
    }

    return {
        id: role.uuid,
        name: role.displayName,
        description: role.description,
        iconUrl: role.displayIcon,
    };
}

function toAgentAbility(ability: AgentAbilityDto): AgentAbility {
    return {
        slot: ability.slot,
        name: ability.displayName,
        description: ability.description,
        iconUrl: ability.displayIcon,
    };
}

export function toAgentSummary(agent: AgentDto): AgentSummary {
    return {
        id: agent.uuid,
        name: agent.displayName,
        description: agent.description,
        iconUrl: agent.displayIcon,
        portraitUrl: agent.fullPortrait,
        colors: agent.backgroundGradientColors.map(toCssColor),
        role: toAgentRole(agent.role),
    };
}

export function toAgentDetail(agent: AgentDto): AgentDetail {
    return {
        ...toAgentSummary(agent),
        abilities: agent.abilities.map(toAgentAbility),
    };
}