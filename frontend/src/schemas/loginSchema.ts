import {z} from "zod"

export const loginschema = z.object({
    email: z.email("Digite uma email válido!"),
    password: z.string().min(6, "Tamanho mínimo de 6 caracteres!")

})

export type LoginSchema = z.infer<typeof loginschema>