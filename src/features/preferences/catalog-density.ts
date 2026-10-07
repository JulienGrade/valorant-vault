import "server-only";

import { cookies } from "next/headers";

import { catalogDensitySchema } from "@/features/preferences/schemas";
import type { CatalogDensity } from "@/features/preferences/types";

export const CATALOG_DENSITY_COOKIE =
    "valorant-vault-catalog-density";

export async function getCatalogDensity(): Promise<CatalogDensity> {
    const cookieStore = await cookies();

    const cookieValue = cookieStore.get(
        CATALOG_DENSITY_COOKIE,
    )?.value;

    const result =
        catalogDensitySchema.safeParse(cookieValue);

    if (!result.success) {
        return "comfortable";
    }

    return result.data;
}