import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";

import { TiltCard } from "@/components/ui/tilt-card";
import type { AgentSummary } from "@/features/agents/types";
import { AgentFavoriteButton } from "@/features/favorites/agent-favorite-button";

import styles from "./agent-card.module.css";

type AgentCardProps = {
    agent: AgentSummary;
    index: number;
};

type AgentColorStyle = CSSProperties & {
    "--agent-color-1": string;
    "--agent-color-2": string;
    "--agent-color-3": string;
    "--agent-color-4": string;
};

function normalizeColor(
    color: string | undefined,
    fallback: string,
): string {
    if (!color) {
        return fallback;
    }

    return color.startsWith("#")
        ? color
        : `#${color}`;
}

export function AgentCard({
                              agent,
                              index,
                          }: AgentCardProps) {
    const imageUrl =
        agent.portraitUrl ?? agent.iconUrl;

    const agentColorStyle: AgentColorStyle = {
        "--agent-color-1": normalizeColor(
            agent.colors[0],
            "#ff4655",
        ),
        "--agent-color-2": normalizeColor(
            agent.colors[1],
            "#172430",
        ),
        "--agent-color-3": normalizeColor(
            agent.colors[2],
            "#304454",
        ),
        "--agent-color-4": normalizeColor(
            agent.colors[3],
            "#0f1923",
        ),
    };

    const cardNumber = String(index + 1).padStart(
        2,
        "0",
    );

    return (
        <TiltCard
            className={styles.card}
            style={agentColorStyle}
        >
            <Link
                className={styles.link}
                href={`/agents/${agent.id}`}
                aria-label={`Découvrir l’agent ${agent.name}`}
            >
                <div className={styles.visual}>
                    <span
                        className={styles.number}
                        aria-hidden="true"
                    >
                        {cardNumber}
                    </span>

                    <Image
                        className={styles.image}
                        src={imageUrl}
                        alt=""
                        fill
                        sizes="
                            (min-width: 75rem) 18rem,
                            (min-width: 48rem) 33vw,
                            100vw
                        "
                    />
                </div>

                <div className={styles.content}>
                    <p className={styles.role}>
                        {agent.role?.name ??
                            "Rôle inconnu"}
                    </p>

                    <h2>{agent.name}</h2>

                    <p className={styles.description}>
                        {agent.description}
                    </p>

                    <span className={styles.discover}>
                        Découvrir l’agent
                    </span>
                </div>
            </Link>

            <AgentFavoriteButton agent={agent} />
        </TiltCard>
    );
}