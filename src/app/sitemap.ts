import type { MetadataRoute } from "next";

import { getAgents } from "@/features/agents/service";
import { absoluteUrl } from "@/lib/site-config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const agents = await getAgents();
    const lastModified = new Date();

    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: absoluteUrl("/"),
            lastModified,
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: absoluteUrl("/agents"),
            lastModified,
            changeFrequency: "daily",
            priority: 0.9,
        },
        {
            url: absoluteUrl("/favoris"),
            lastModified,
            changeFrequency: "monthly",
            priority: 0.4,
        },
        {
            url: absoluteUrl("/preferences"),
            lastModified,
            changeFrequency: "monthly",
            priority: 0.3,
        },
    ];

    const agentRoutes: MetadataRoute.Sitemap =
        agents.map((agent) => ({
            url: absoluteUrl(`/agents/${agent.id}`),
            lastModified,
            changeFrequency: "weekly",
            priority: 0.7,
        }));

    return [
        ...staticRoutes,
        ...agentRoutes,
    ];
}