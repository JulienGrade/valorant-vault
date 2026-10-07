import { z } from "zod";

export const catalogDensitySchema = z.enum([
    "comfortable",
    "compact",
]);