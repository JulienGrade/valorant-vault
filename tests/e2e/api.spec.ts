import {
    expect,
    test,
} from "@playwright/test";

test.describe("API des agents", () => {
    test("retourne les agents correspondant à Sage", async ({
                                                                request,
                                                            }) => {
        const response = await request.get(
            "/api/agents?search=sage",
        );

        expect(response.status()).toBe(200);

        const body = await response.json();

        expect(body.meta.filters).toEqual({
            search: "sage",
            role: "",
        });

        expect(body.meta.total).toBeGreaterThan(0);

        expect(body.data).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: "Sage",
                }),
            ]),
        );
    });

    test("refuse un identifiant invalide", async ({
                                                      request,
                                                  }) => {
        const response = await request.get(
            "/api/agents/identifiant-invalide",
        );

        expect(response.status()).toBe(400);

        const body = await response.json();

        expect(body.error).toEqual({
            code: "INVALID_AGENT_ID",
            message:
                "L’identifiant de l’agent est invalide.",
        });
    });
});