"use client"

import action_login from "@/actions/action_login";
import { validationLoging } from "@/validations";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function useLogin() {
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const data: typeLogin = {
            email: formData.get('email') as string,
            password: formData.get('password') as string,
        }


        // validaciones con ZOD
        const result = validationLoging.safeParse(data)
        if (!result.success) {
            result.error.issues.forEach((issue) => {
                toast.error(issue.message)
            })
            return
        }

        const response = await action_login(data as typeLogin);

        // manejo de respuesta errores
        if (response.success) {
            toast.success(response.message)
            // almacenamiento de token
            localStorage.setItem("token", response.token || "")
            // redireccionamiento
            setTimeout(() => {
                router.push('/client')
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
        handleLogin
    }
}
