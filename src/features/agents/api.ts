import "server-only";

import {env} from "@/lib/env";
import {ExternalApiError} from "./errors";

const REVALIDATE_SECONDS = 60 * 60;

function buildUrl(
    path: string,
    searchParams?: URLSearchParams,
): URL {
    const baseUrl = env.VALORANT_API_BASE_URL.replace(/\/$/, "");
    const normalizedPath = path.replace(/^\/+/, "");

    const url = new URL(`${baseUrl}/${normalizedPath}`);

    url.searchParams.set(
        "language",
        env.VALORANT_API_LANGUAGE,
    );

    searchParams?.forEach((value, key) => {
        url.searchParams.set(key, value);
    });

    return url;
}

export async function fetchValorantApi(
    path: string,
    searchParams?: URLSearchParams,
): Promise<unknown> {
    const url = buildUrl(path, searchParams);

    const response = await fetch(url, {
        headers: {
            Accept: "application/json",
        },
        next: {
            revalidate: REVALIDATE_SECONDS,
        },
    });

    if (!response.ok) {
        throw new ExternalApiError(
            `Valorant-API a répondu avec le statut ${response.status}.`,
            response.status,
        );
    }

    return await response.json();
}