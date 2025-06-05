import { z } from "zod";

export const validationCreateClient = z.object({
    names: z
        .string()
        .min(2, "El nombre debe tener al menos 2 caracteres")
        .max(50, "El nombre no debe superar los 50 caracteres"),

    lastnames: z
        .string()
        .min(2, "El apellido debe tener al menos 2 caracteres")
        .max(50, "El apellido no debe superar los 50 caracteres"),

    phone: z
        .string()
        .regex(/^\d{10}$/, "El telefono debe tener exactamente 10 dígitos numéricos"),

    email: z
        .string()
        .min(2, "El correo debe tener al menos 2 caracteres")
        .max(100, "El correo no debe superar los 50 caracteres")
        .email("El correo debe tener un formato válido"),

    password: z
        .string()
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/,
            "La contraseña debe incluir mayúscula, minúscula, número y un carácter especial"
        ),
});

export const validationUpdateClient = z.object({
    names: z
        .string()
        .min(2, "El nombre debe tener al menos 2 caracteres")
        .max(50, "El nombre no debe superar los 50 caracteres"),

    lastnames: z
        .string()
        .min(2, "El apellido debe tener al menos 2 caracteres")
        .max(50, "El apellido no debe superar los 50 caracteres"),

    phone: z
        .string()
        .regex(/^\d{10}$/, "El telefono debe tener exactamente 10 dígitos numéricos"),

    email: z
        .string()
        .min(2, "El correo debe tener al menos 2 caracteres")
        .max(100, "El correo no debe superar los 50 caracteres")
        .email("El correo debe tener un formato válido"),
});

export const validationTask = z.object({
    title: z
        .string()
        .min(2, "El nombre o titulo debe tener al menos 2 caracteres")
        .max(300, "El nombre o titulo no debe superar los 100 caracteres"),
    description: z
        .string()
        .min(2, "La descripcion debe tener al menos 2 caracteres")
        .max(300, "La descripcion no debe superar los 300 caracteres"),
})

export const validationProject = z.object({
    name: z
        .string()
        .min(2, "El nombre o titulo debe tener al menos 2 caracteres")
        .max(300, "El nombre o titulo no debe superar los 100 caracteres"),
    description: z
        .string()
        .min(2, "La descripcion debe tener al menos 2 caracteres")
        .max(300, "La descripcion no debe superar los 300 caracteres"),
})

export const validationPassword = z.object({
    passwordNew: z
        .string()
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .max(100, "La contraseña no debe superar los 100 caracteres")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/,
            "La contraseña debe incluir mayúscula, minúscula, número y un carácter especial"
        ),
    passwordOld: z
        .string()
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/,
            "La contraseña debe incluir mayúscula, minúscula, número y un carácter especial"
        ),
})

export const validationLoging = z.object({
    email: z
        .string()
        .min(2, "El correo debe tener al menos 2 caracteres")
        .max(100, "El correo no debe superar los 50 caracteres")
        .email("El correo debe tener un formato válido"),
    password: z
        .string()
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/,
            "La contraseña debe incluir mayúscula, minúscula, número y un carácter especial"
        ),
})