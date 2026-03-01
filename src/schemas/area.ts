import {z} from  'zod'
export const areaSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
  sede: z.number({
    message: "Debe seleccionar una sede",
  }),
});

export type AreaFormData = z.infer<typeof areaSchema>;