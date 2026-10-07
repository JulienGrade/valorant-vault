import "server-only";

import { z, type ZodType } from "zod";

import { fetchValorantApi } from "@/features/agents/api";
import {
    agentDetailResponseSchema,
    agentListResponseSchema,
} from "@/features/agents/schemas";
import type {
    AgentDetail,
    AgentSummary,
} from "@/features/agents/types";
import {
    toAgentDetail,
    toAgentSummary,
} from "@/features/agents/mappers";
import {
    ExternalApiError,
    InvalidApiDataError,
} from "@/features/agents/errors";

function parseOrThrow<T>(
    schema: ZodType<T>,
    data: unknown,
): T {
    const result = schema.safeParse(data);

    if (!result.success) {
        throw new InvalidApiDataError(
            `La réponse de Valorant-API est invalide : ${z.prettifyError(
                result.error,
            )}`,
        );
    }

    return result.data;
}

export async function getAgents(): Promise<AgentSummary[]> {
    const searchParams = new URLSearchParams({
        isPlayableCharacter: "true",
    });

    const json = await fetchValorantApi(
        "agents",
        searchParams,
    );

    const response = parseOrThrow(
        agentListResponseSchema,
        json,
    );

    return response.data
        .filter((agent) => agent.isPlayableCharacter)
        .map(toAgentSummary)
        .sort((firstAgent, secondAgent) =>
            firstAgent.name.localeCompare(
                secondAgent.name,
                "fr",
            ),
        );
}

export async function getAgent(
    id: string,
): Promise<AgentDetail | null> {
    try {
        const json = await fetchValorantApi(
            `agents/${id}`,
        );

        const response = parseOrThrow(
            agentDetailResponseSchema,
            json,
        );

        return toAgentDetail(response.data);
    } catch (error) {
        if (
            error instanceof ExternalApiError &&
            (error.status === 400 || error.status === 404)
        ) {
            return null;
        }

        throw error;
    }
}