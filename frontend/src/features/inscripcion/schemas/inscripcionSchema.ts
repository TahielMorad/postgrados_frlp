import { z } from "zod";

export const inscripcionSchema = z
  .object({
    nombre: z
      .string()
      .trim()
      .min(2, "El nombre debe tener al menos 2 caracteres"),

    apellido: z
      .string()
      .trim()
      .min(2, "El apellido debe tener al menos 2 caracteres"),

    nacionalidad: z.string().trim().min(2, "Ingresá tu nacionalidad"),

    tipoDocumento: z.enum(["DNI", "PASAPORTE"], {
      message: "Seleccioná un tipo de documento",
    }),

    numeroDocumento: z
      .string()
      .trim()
      .regex(/^\d{7,8}$/, "El documento debe tener 7 u 8 dígitos"),

    telefonoMovil: z
      .string()
      .trim()
      .regex(/^\+?[\d\s()-]{8,20}$/, "Ingresá un teléfono móvil válido"),

    telefonoFijo: z
      .string()
      .trim()
      .refine(
        (value) => value === "" || /^\+?[\d\s()-]{8,20}$/.test(value),
        "Ingresá un teléfono fijo válido",
      ),

    emailPrincipal: z
      .string()
      .trim()
      .toLowerCase()
      .pipe(z.email("Ingresá un correo electrónico válido")),

    emailAlternativo: z
      .string()
      .trim()
      .toLowerCase()
      .pipe(z.email("Ingresá un correo electrónico alternativo válido")),

    direccion: z.string().trim().min(3, "Ingresá una dirección válida"),

    ciudad: z.string().trim().min(2, "Ingresá una ciudad"),

    provincia: z.string().trim().min(2, "Ingresá una provincia"),

    pais: z.string().trim().min(2, "Ingresá un país"),

    tituloGrado: z.string().trim().min(3, "Ingresá tu título de grado"),

    tituloPosgrado: z.string().trim(),

    carreras: z
      .array(z.string())
      .min(1, "Seleccioná al menos una carrera")
      .max(2, "Podés seleccionar como máximo dos carreras"),

    medioConocimiento: z.string().min(1, "Seleccioná cómo conociste la oferta"),

    motivacion: z
      .string()
      .trim()
      .min(50, "La motivación debe tener al menos 50 caracteres"),

    solicitaBeca: z.boolean(),

    porcentajeBeca: z.enum(["", "30", "100"]),
  })
  .superRefine((data, context) => {
    if (data.emailPrincipal === data.emailAlternativo) {
      context.addIssue({
        code: "custom",
        path: ["emailAlternativo"],
        message: "El correo alternativo debe ser diferente al principal",
      });
    }

    if (data.solicitaBeca && data.porcentajeBeca === "") {
      context.addIssue({
        code: "custom",
        path: ["porcentajeBeca"],
        message: "Seleccioná el porcentaje de beca solicitado",
      });
    }
  });

export type InscripcionFormData = z.infer<typeof inscripcionSchema>;
