import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { filterAgents } from "@/features/agents/selectors";
import { getAgents } from "@/features/agents/service";

const agentQuerySchema = z.object({
    search: z.string().trim().max(80),
    role: z.string().trim().max(50),
});

export async function GET(request: NextRequest) {
    const queryResult = agentQuerySchema.safeParse({
        search:
            request.nextUrl.searchParams.get("search") ?? "",
        role:
            request.nextUrl.searchParams.get("role") ?? "",
    });

    if (!queryResult.success) {
        return NextResponse.json(
            {
                error: {
                    code: "INVALID_QUERY",
                    message:
                        "Les paramètres de recherche sont invalides.",
                    details: queryResult.error.issues.map(
                        (issue) => issue.message,
                    ),
                },
            },
            {
                status: 400,
            },
        );
    }

    try {
        const agents = await getAgents();

        const filteredAgents = filterAgents(
            agents,
            queryResult.data,
        );

        return NextResponse.json({
            data: filteredAgents,
            meta: {
                total: filteredAgents.length,
                filters: queryResult.data,
            },
        });
    } catch (error) {
        console.error(
            "Impossible de récupérer les agents :",
            error,
        );

        return NextResponse.json(
            {
                error: {
                    code: "EXTERNAL_API_ERROR",
                    message:
                        "Les agents sont temporairement indisponibles.",
                },
            },
            {
                status: 502,
            },
        );
    }
}