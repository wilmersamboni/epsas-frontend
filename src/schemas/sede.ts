import { z } from 'zod';

export const sedeSchema = z.object({
  nombre: z.string()
    .min(1, { message: "El nombre de la sede es obligatorio" })
    .max(100, { message: "El nombre no puede exceder los 100 caracteres" })
    .trim(),
  centro_formacion_fk: z.number({
    required_error: "Debes seleccionar un centro de formación"
  }).positive({ message: "Selecciona un centro válido" })
});

export type FormSede = z.infer<typeof sedeSchema>;