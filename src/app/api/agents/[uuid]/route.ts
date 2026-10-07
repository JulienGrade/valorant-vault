import { NextResponse } from "next/server";
import { z } from "zod";

import { getAgent } from "@/features/agents/service";

type AgentRouteContext = {
    params: Promise<{
        uuid: string;
    }>;
};

const agentUuidSchema = z.string().uuid();

export async function GET(
    _request: Request,
    { params }: AgentRouteContext,
) {
    const { uuid } = await params;

    const uuidResult = agentUuidSchema.safeParse(uuid);

    if (!uuidResult.success) {
        return NextResponse.json(
            {
                error: {
                    code: "INVALID_AGENT_ID",
                    message:
                        "L’identifiant de l’agent est invalide.",
                },
            },
            {
                status: 400,
            },
        );
    }

    try {
        const agent = await getAgent(uuidResult.data);

        if (!agent) {
            return NextResponse.json(
                {
                    error: {
                        code: "AGENT_NOT_FOUND",
                        message: "Cet agent est introuvable.",
                    },
                },
                {
                    status: 404,
                },
            );
        }

        return NextResponse.json({
            data: agent,
        });
    } catch (error) {
        console.error(
            "Impossible de récupérer l’agent :",
            error,
        );

        return NextResponse.json(
            {
                error: {
                    code: "EXTERNAL_API_ERROR",
                    message:
                        "L’agent est temporairement indisponible.",
                },
            },
            {
                status: 502,
            },
        );
    }
}