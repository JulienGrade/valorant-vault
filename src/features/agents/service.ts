import "server-only";

import { z } from "zod";

import { fetchValorantApi } from "./api";
import {
    ExternalApiError,
    InvalidApiDataError,
} from "./errors";
import {
    toAgentDetail,
    toAgentSummary,
} from "./mappers";
import {
    agentDetailResponseSchema,
    agentListResponseSchema,
} from "./schemas";
import type {
    AgentDetail,
    AgentSummary,
} from "./types";

function parseOrThrow<T>(
    result: z.ZodSafeParseResult<T>,
): T {
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
        agentListResponseSchema.safeParse(json),
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
            `agents/${encodeURIComponent(id)}`,
        );

        const response = parseOrThrow(
            agentDetailResponseSchema.safeParse(json),
        );

        return toAgentDetail(response.data);
    } catch (error) {
        if (
            error instanceof ExternalApiError &&
            error.status === 404
        ) {
            return null;
        }

        throw error;
    }
}