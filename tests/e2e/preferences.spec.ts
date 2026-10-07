import {
    expect,
    test,
} from "@playwright/test";

test.describe("préférences d’affichage", () => {
    test("conserve le thème clair après actualisation", async ({
                                                                   page,
                                                               }) => {
        await page.goto("/preferences");

        await expect(
            page.getByRole("heading", {
                level: 1,
                name: "Préférences",
            }),
        ).toBeVisible();

        const lightTheme = page.getByRole("radio", {
            name: /Clair/i,
        });

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
});