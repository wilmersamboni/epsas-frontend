import { z } from 'zod';

export const userSchema= z.object({
    login: z 
    .string({required_error:"Nombre es requerido"})
    .min(3, { message: "Longitud minima 3" }),

    password: z
    .string({required_error:"Apellido es requerido"})
    .min(3, { message: "Longitud minima 3" }),
})
