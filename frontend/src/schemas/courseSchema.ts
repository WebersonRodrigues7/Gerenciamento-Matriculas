import {z} from "zod"

export const courseschema = z.object({
    name: z.string().min(10, "Nome do curso com no minímo 10 caracteres"),
    price: z.number({error: "Digite um preço válido!"}).gt(0, "Preço deve ser maior que 0"),
    description: z.string().min(20,"Descrição com no minímo 20 caracteres"),

})

export type CourseSchema = z.infer<typeof courseschema>