import { z } from 'zod';

export const centroSchema = z.object({
  nombre: z.string()
    .min(1, { message: "El nombre del centro es obligatorio" })
    .max(100, { message: "El nombre no puede exceder los 100 caracteres" })
    .trim()
});

export type FormCentro = z.infer<typeof centroSchema>;