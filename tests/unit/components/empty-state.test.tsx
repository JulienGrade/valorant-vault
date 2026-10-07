import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { EmptyState } from "@/components/ui/empty-state";

describe("EmptyState", () => {
    it("affiche le titre et la description", () => {
        render(
            <EmptyState
                title="Aucun agent"
                description="La liste est actuellement vide."
            />,
        );

        expect(
            screen.getByRole("heading", {
                name: "Aucun agent",
            }),
        ).toBeInTheDocument();

        expect(
            screen.getByText(
                "La liste est actuellement vide.",
            ),
        ).toBeInTheDocument();
    });

    it("affiche une action lorsqu’elle est fournie", () => {
        render(
            <EmptyState
                title="Aucun favori"
                description="Ajoutez votre premier favori."
                action={
                    <button type="button">
                        Voir les agents
                    </button>
                }
            />,
        );

        expect(
            screen.getByRole("button", {
                name: "Voir les agents",
            }),
        ).toBeInTheDocument();
    });

    it("n’affiche aucune action lorsqu’elle est absente", () => {
        render(
            <EmptyState
                title="Aucun résultat"
                description="Modifiez votre recherche."
            />,
        );

        expect(
            screen.queryByRole("button"),
        ).not.toBeInTheDocument();
    });
});