import Image from "next/image";
import Link from "next/link";

import type { AgentSummary } from "../types";
import styles from "./agent-card.module.css";

type AgentCardProps = {
    agent: AgentSummary;
};

export function AgentCard({ agent }: AgentCardProps) {
    const imageUrl = agent.portraitUrl ?? agent.iconUrl;

    return (
        <article className={styles.card}>
            <Link
                className={styles.link}
                href={`/agents/${agent.id}`}
            >
                <div className={styles.visual}>
                    <Image
                        className={styles.image}
                        src={imageUrl}
                        alt={`Portrait de ${agent.name}`}
                        fill
                        sizes="
              (min-width: 75rem) 17rem,
              (min-width: 48rem) 30vw,
              85vw
            "
                    />

                    <span className={styles.number} aria-hidden="true">
            {agent.name.slice(0, 2).toUpperCase()}
          </span>
                </div>

                <div className={styles.content}>
                    <p className={styles.role}>
                        {agent.role?.name ?? "Rôle inconnu"}
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
        </article>
    );
}