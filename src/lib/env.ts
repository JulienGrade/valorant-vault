import "server-only";
import { z } from "zod";

const envSchema = z.object({
  VALORANT_API_BASE_URL: z
    .string()
    .url()
    .default("https://valorant-api.com/v1"),

  VALORANT_API_LANGUAGE: z
    .string()
    .regex(/^[a-z]{2}-[A-Z]{2}$/)
    .default("fr-FR"),
});

export const env = envSchema.parse({
  VALORANT_API_BASE_URL: process.env.VALORANT_API_BASE_URL,
  VALORANT_API_LANGUAGE: process.env.VALORANT_API_LANGUAGE,
});