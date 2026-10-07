import { z } from "zod";

const nullableImageSchema = z.string().url().nullable();

const agentRoleDtoSchema = z.object({
    uuid: z.string().min(1),
    displayName: z.string().min(1),
    description: z.string(),
    displayIcon: nullableImageSchema,
});

const agentAbilityDtoSchema = z.object({
    slot: z.string().min(1),
    displayName: z.string().min(1),
    description: z.string(),
    displayIcon: nullableImageSchema,
});

const colorSchema = z.string().regex(/^[0-9a-fA-F]{8}$/);

export const agentDtoSchema = z.object({
    uuid: z.string().min(1),
    displayName: z.string().min(1),
    description: z.string(),
    displayIcon: z.string().url(),
    fullPortrait: nullableImageSchema,
    backgroundGradientColors: z.array(colorSchema).default([]),
    isPlayableCharacter: z.boolean(),
    role: agentRoleDtoSchema.nullable(),
    abilities: z.array(agentAbilityDtoSchema).default([]),
});

export const agentListResponseSchema = z.object({
    status: z.number().int(),
    data: z.array(agentDtoSchema),
});

export const agentDetailResponseSchema = z.object({
    status: z.number().int(),
    data: agentDtoSchema,
});

export type AgentDto = z.infer<typeof agentDtoSchema>;
export type AgentRoleDto = z.infer<typeof agentRoleDtoSchema>;
export type AgentAbilityDto = z.infer<typeof agentAbilityDtoSchema>;