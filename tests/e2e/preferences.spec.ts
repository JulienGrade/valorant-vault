import {
    expect,
    test,
} from "@playwright/test";

test.describe("préférences d’affichage", () => {
    test("conserve le thème clair après actualisation", async ({
                                                                   page,
                                                               }) => {
        await page.goto("/preferences");

        const lightTheme = page.getByRole("radio", {
            name: /Clair/i,
        });

        await expect(lightTheme).toBeEnabled();

        await lightTheme.check();

        await expect
            .poll(async () => {
                return page.evaluate(() =>
                    window.localStorage.getItem(
                        "valorant-vault-theme",
                    ),
                );
            })
            .toBe("light");

        await expect(
            page.locator("html"),
        ).toHaveAttribute("data-theme", "light");

        await page.reload();

        await expect(
            page.locator("html"),
        ).toHaveAttribute("data-theme", "light");

        await expect(
            page.getByRole("radio", {
                name: /Clair/i,
            }),
        ).toBeChecked();
    });

    test("enregistre la densité compacte dans un cookie", async ({
                                                                     context,
                                                                     page,
                                                                 }) => {
        await page.goto("/preferences");

        const compactDensity = page.getByRole(
            "radio",
            {
                name: /Compact/i,
            },
        );

        await compactDensity.check();

        await page
            .getByRole("button", {
                name: "Enregistrer la préférence",
            })
            .click();

        await expect(
            page.getByRole("status"),
        ).toContainText(
            "Votre préférence d’affichage a été enregistrée.",
        );

        const cookies = await context.cookies();

        const densityCookie = cookies.find(
            (cookie) =>
                cookie.name ===
                "valorant-vault-catalog-density",
        );

        expect(densityCookie?.value).toBe("compact");

        await page.goto("/agents");

        await expect(
            page.locator(
                '[data-density="compact"]',
            ),
        ).toBeVisible();
    });
});