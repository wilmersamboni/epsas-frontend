import { z } from 'zod';
export const cursoSchema = z.object({
  codigo: z.number().min(1, "El código es obligatorio"),
  area: z.number().positive("Debe seleccionar un Área"),
  programa: z.number().positive("Debe seleccionar un Programa"),
  persona: z.number().positive("Debe seleccionar un Líder"),
  Fecha_inicio: z.string().min(1, "La fecha de inicio es obligatoria"),
  Fecha_fin_lectiva: z.string().min(1, "La fecha fin lectiva es obligatoria"),
  Fecha_fin_practica: z.string().min(1, "La fecha fin práctica es obligatoria"),
});

 export type CursoFormData = z.infer<typeof cursoSchema>;