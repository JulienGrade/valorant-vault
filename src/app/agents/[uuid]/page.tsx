import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FavoriteButton } from "@/features/favorites/favorite-button";

import { getAgent } from "@/features/agents/service";

import styles from "./page.module.css";

type AgentDetailPageProps = {
    params: Promise<{
        uuid: string;
    }>;
};

type AgentVisualStyle = CSSProperties & {
    "--agent-color-one": string;
    "--agent-color-two": string;
};

export async function generateMetadata({
                                           params,
                                       }: AgentDetailPageProps): Promise<Metadata> {
    const { uuid } = await params;
    const agent = await getAgent(uuid);

    if (!agent) {
        return {
            title: "Agent introuvable",
            description: "Cet agent Valorant est introuvable.",
        };
    }

    return {
        title: agent.name,
        description: `Découvrez ${agent.name}, son rôle et ses compétences dans Valorant.`,
    };
}

export default async function AgentDetailPage({
                                                  params,
                                              }: AgentDetailPageProps) {
    const { uuid } = await params;
    const agent = await getAgent(uuid);

    if (!agent) {
        notFound();
    }

    const visualStyle: AgentVisualStyle = {
        "--agent-color-one": agent.colors[0] ?? "#ff4655",
        "--agent-color-two": agent.colors[2] ?? "#172430",
    };

    const portraitUrl = agent.portraitUrl ?? agent.iconUrl;

    return (
        <main id="main-content" className="container page-section">
            <Link className={styles.back} href="/agents">
                ← Retour aux agents
            </Link>

            <div className={styles.layout}>
                <div className={styles.visual} style={visualStyle}>
                    <Image
                        className={styles.portrait}
                        src={portraitUrl}
                        alt={`Portrait de ${agent.name}`}
                        fill
                        sizes="(min-width: 64rem) 40vw, 90vw"
                    />

                    <span className={styles.agentName} aria-hidden="true">
            {agent.name}
          </span>
                </div>

                <section className={styles.content}>
                    <div>
                        <p className="eyebrow">Agent Valorant</p>
                        <h1>{agent.name}</h1>
                    </div>

                    {agent.role ? (
                        <div className={styles.role}>
                            {agent.role.iconUrl ? (
                                <Image
                                    src={agent.role.iconUrl}
                                    alt=""
                                    width={48}
                                    height={48}
                                />
                            ) : null}

                            <div>
                                <span>Rôle</span>
                                <strong>{agent.role.name}</strong>
                            </div>
                        </div>
                    ) : null}
                    <FavoriteButton
                        agent={{
                            uuid: agent.id,
                            name: agent.name,
                            iconUrl: agent.iconUrl,
                            roleName: agent.role?.name ?? null,
                        }}
                    />
                    <p className={styles.description}>
                        {agent.description}
                    </p>

                    {agent.role ? (
                        <section
                            className={styles.roleDescription}
                            aria-labelledby="role-title"
                        >
                            <h2 id="role-title">
                                Le rôle de {agent.role.name}
                            </h2>

                            <p>{agent.role.description}</p>
                        </section>
                    ) : null}

                    <section
                        className={styles.abilities}
                        aria-labelledby="abilities-title"
                    >
                        <header>
                            <p className="eyebrow">Compétences</p>

                            <h2 id="abilities-title">
                                Maîtrisez son arsenal.
                            </h2>
                        </header>

                        <div className={styles.abilityList}>
                            {agent.abilities.map((ability) => (
                                <article
                                    className={styles.ability}
                                    key={`${ability.slot}-${ability.name}`}
                                >
                                    <div className={styles.abilityIcon}>
                                        {ability.iconUrl ? (
                                            <Image
                                                src={ability.iconUrl}
                                                alt=""
                                                width={56}
                                                height={56}
                                            />
                                        ) : (
                                            <span aria-hidden="true">
                        {ability.name.slice(0, 1)}
                      </span>
                                        )}
                                    </div>

                                    <div>
                                        <p>{ability.slot}</p>
                                        <h3>{ability.name}</h3>
                                        <p>{ability.description}</p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>
                </section>
            </div>
        </main>
    );
}