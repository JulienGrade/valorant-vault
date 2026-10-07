import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Pagination } from "@/components/ui/pagination";

describe("Pagination", () => {
    it("n’affiche rien lorsqu’il n’existe qu’une page", () => {
        const { container } = render(
            <Pagination
                currentPage={1}
                totalPages={1}
                onPageChange={() => undefined}
            />,
        );

        expect(container).toBeEmptyDOMElement();
    });

    it("indique la page actuellement sélectionnée", () => {
        render(
            <Pagination
                currentPage={2}
                totalPages={3}
                onPageChange={() => undefined}
            />,
        );

        expect(
            screen.getByRole("button", {
                name: "Afficher la page 2",
            }),
        ).toHaveAttribute("aria-current", "page");
    });

    it("demande l’affichage de la page sélectionnée", () => {
        const onPageChange = vi.fn();

        render(
            <Pagination
                currentPage={1}
                totalPages={3}
                onPageChange={onPageChange}
            />,
        );

        fireEvent.click(
            screen.getByRole("button", {
                name: "Afficher la page 2",
            }),
        );

        expect(onPageChange).toHaveBeenCalledWith(2);
    });

    it("désactive précédent sur la première page", () => {
        render(
            <Pagination
                currentPage={1}
                totalPages={3}
                onPageChange={() => undefined}
            />,
        );

        expect(
            screen.getByRole("button", {
                name: "Précédent",
            }),
        ).toBeDisabled();
    });

    it("désactive suivant sur la dernière page", () => {
        render(
            <Pagination
                currentPage={3}
                totalPages={3}
                onPageChange={() => undefined}
            />,
        );

        expect(
            screen.getByRole("button", {
                name: "Suivant",
            }),
        ).toBeDisabled();
    });
});