"use client";

import Link from "next/link";

import { EmptyState } from "@/components/ui/empty-state";
import { FavoriteCard } from "@/features/favorites/favorite-card";
import { useFavorites } from "@/features/favorites/use-favorites";

import styles from "./favorites-list.module.css";

export function FavoritesList() {
    const {
        favorites,
        isHydrated,
    } = useFavorites();

    if (!isHydrated) {
        return (
            <p
                className={styles.loading}
                aria-live="polite"
            >
                Chargement de vos favoris…
            </p>
        );
    }

    if (favorites.length === 0) {
        return (
            <EmptyState
                title="Aucun agent favori"
                description="Vous n’avez encore ajouté aucun agent à vos favoris. Consultez les agents pour commencer votre sélection."
                action={
                    <Link
                        className="button button-primary"
                        href="/agents"
                    >
                        Découvrir les agents
                    </Link>
                }
            />
        );
    }

    return (
        <section className={styles.favorites}>
            <p className={styles.count} aria-live="polite">
                {favorites.length}{" "}
                {favorites.length > 1
                    ? "agents favoris"
                    : "agent favori"}
            </p>

            <div className={styles.grid}>
                {favorites.map((agent) => (
                    <FavoriteCard
                        agent={agent}
                        key={agent.uuid}
                    />
                ))}
            </div>
        </section>
    );
}