"use client"

import action_create_client from "@/actions/clients/action_create_client";
import { validationCreateClient } from "@/validations";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function useRegister() {
    const router = useRouter()

    const handleCreateClient = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const data: typeClientResponse = {
            names: formData.get('names') as string,
            lastnames: formData.get('lastnames') as string,
            email: formData.get('email') as string,
            phone: formData.get("phone") as string,
            password: formData.get("password1") as string,
        }

        // validaciones con ZOD
        const result = validationCreateClient.safeParse(data)
        if (!result.success) {
            result.error.issues.forEach((issue) => {
                toast.error(issue.message)
            })
            return
        }

        // validar igualdad de new password
        if (data.password !== formData.get("password2")) {
            toast.error("Las contraseñas no son iguales");
            return
        }

        const response = await action_create_client(data as typeClientResponse);

        // manejo de respuesta errores
        if (response.success) {
            toast.success(response.message)
            // redireccionamiento
            setTimeout(() => {
                router.push('/auth/login')
            }, 500);
        } else {
            if (response.errors?.length) {
                // errores del back validaciones
                response.errors.forEach((err) => {
                    toast.error(err);
                });
            } else {
                toast.error(response.message);
            }
        }
    }

    return {
        handleCreateClient
    }
}
