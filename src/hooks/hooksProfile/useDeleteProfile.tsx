"use client"

import action_delete_client from "@/actions/clients/action_delete_client";
import action_delete_project from "@/actions/projects/action_delete_project";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function useDeleteProfile() {

    const router = useRouter();

    const handleDeleteProfile = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(e.currentTarget);

        if (formData.get('delete') == "Eliminar") {
            // manejo de token
            const token = localStorage.getItem("token");
            if (!token) return

            const response = await action_delete_client(token);

            // validaciones con ZOD
            if (response.success) {
                toast.success(response.message)
                // restableser formulario
                form.reset();
                // redirrecionar
                setTimeout(() => {
                    router.push('/auth/login')
                }, 500);
            } else {
                toast.error(response.message);
            }
        } else {
            toast.error("Para Eliminar el projecto escriba: Eliminar")
        }
    }

    return {
        handleDeleteProfile
    }
}