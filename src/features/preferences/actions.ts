"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import {
    CATALOG_DENSITY_COOKIE,
} from "@/features/preferences/catalog-density";
import { catalogDensitySchema } from "@/features/preferences/schemas";
import type {
    CatalogDensityActionState,
} from "@/features/preferences/types";

export async function saveCatalogDensity(
    _previousState: CatalogDensityActionState,
    formData: FormData,
): Promise<CatalogDensityActionState> {
    const result = catalogDensitySchema.safeParse(
        formData.get("density"),
    );

    if (!result.success) {
        return {
            status: "error",
            message:
                "La préférence sélectionnée est invalide.",
        };
    }

    const cookieStore = await cookies();

    cookieStore.set(
        CATALOG_DENSITY_COOKIE,
        result.data,
        {
            path: "/",
            httpOnly: true,
            sameSite: "lax",
            secure:
                process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 365,
        },
    );

    revalidatePath("/agents");
    revalidatePath("/preferences");

    return {
        status: "success",
        message:
            "Votre préférence d’affichage a été enregistrée.",
    };
}