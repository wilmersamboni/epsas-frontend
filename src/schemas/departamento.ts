import {z} from 'zod'

export const departamentoSchema= z.object({
    nombre: z.string()
    .min(1, {message:"El nombre del departamento es obligatorio"})
    .max(100,{message:"El nombre no puede exeder los 100 caracteres"})
    .trim()
})

export type formDepartamento= z.infer<typeof departamentoSchema>;