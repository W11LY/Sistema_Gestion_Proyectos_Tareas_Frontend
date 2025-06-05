"use client"

import action_update_client from "@/actions/clients/action_update_client";
import { validationUpdateClient } from "@/validations";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";

export default function useUpdateProfile() {
    const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>, setStateUpdate: Dispatch<SetStateAction<boolean>>, updateClient: (data: typeClientRequest) => void) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const data: typeClientResponse = {
            names: formData.get('names') as string,
            lastnames: formData.get('lastnames') as string,
            email: formData.get('email') as string,
            phone: formData.get('phone') as string,
            password: ""
        }


        // validaciones con ZOD
        const result = validationUpdateClient.safeParse(data)
        if (!result.success) {
            result.error.issues.forEach((issue) => {
                toast.error(issue.message)
            })
            return
        }

        // manejo de token
        const token = localStorage.getItem("token");
        if (!token) return

        const response = await action_update_client(data as typeClientResponse, token);

        // manejo de respuesta errores
        if (response.success) {
            toast.success(response.message);
            // manejo de colecciones update
            updateClient({
                userId: 0,
                names: data.names,
                lastnames: data.lastnames,
                email: data.email,
                phone: data.phone
            })
            setStateUpdate(false)
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
        handleUpdateProfile
    }
}
