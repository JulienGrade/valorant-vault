import {
    expect,
    test,
} from "@playwright/test";

test.describe("parcours des agents", () => {


    test("recherche et ajoute Sage aux favoris", async ({
                                                            page,
                                                        }) => {
        await page.goto("/agents");

        await expect(
            page.getByRole("heading", {
                level: 1,
                name: /agents valorant/i,
            }),
        ).toBeVisible();

        const searchInput = page.getByRole("searchbox", {
            name: "Rechercher un agent",
        });

        await searchInput.fill("Sage");

        const addFavoriteButton = page.getByRole(
            "button",
            {
                name: "Ajouter Sage aux favoris",
            },
        );

        await expect(addFavoriteButton).toBeVisible();

        await addFavoriteButton.click();

        await expect
            .poll(async () => {
                return page.evaluate(() =>
                    window.localStorage.getItem(
                        "valorant-vault-favorites",
                    ),
                );
            })
            .toContain("Sage");

        const removeFavoriteButton = page.getByRole(
            "button",
            {
                name: "Retirer Sage des favoris",
            },
        );

        await expect(removeFavoriteButton).toBeVisible();

        await expect(removeFavoriteButton).toHaveAttribute(
            "aria-pressed",
            "true",
        );

        await page
            .getByRole("link", {
                name: /Sage/i,
            })
            .click();

        await expect(page).toHaveURL(
            /\/agents\/[a-zA-Z0-9-]+/,
        );

        await expect(
            page.getByRole("heading", {
                level: 1,
                name: "Sage",
            }),
        ).toBeVisible();

        await expect(
            page.getByRole("button", {
                name: "Retirer des favoris",
            }),
        ).toBeVisible();

        await page.goto("/favoris");

        await expect(
            page.getByRole("heading", {
                level: 1,
                name: /agents favoris/i,
            }),
        ).toBeVisible();

        await expect(
            page.getByRole("link", {
                name: /Sage/i,
            }),
        ).toBeVisible();
    });
});