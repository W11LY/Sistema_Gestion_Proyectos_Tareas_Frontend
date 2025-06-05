"use client"

import action_update_project from "@/actions/projects/action_update_project";
import { validationProject } from "@/validations";
import { toast } from "react-toastify";

export default function useUpdateProject() {
    const handleUpdateProject = async (e: React.FormEvent<HTMLFormElement>, projectId: number, updateListProject: (data: typeProjectRequest) => void) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(e.currentTarget);

        const data: typeProjectResponse = {
            name: formData.get('title') as string,
            description: formData.get('description') as string,
            clientId: 0
        }


        // validaciones con ZOD
        const result = validationProject.safeParse(data)
        if (!result.success) {
            result.error.issues.forEach((issue) => {
                toast.error(issue.message)
            })
            return
        }

        // manejo de token
        const token = localStorage.getItem("token");
        if (!token) return

        const response = await action_update_project(data as typeProjectResponse, projectId, token);

        // manejo de respuesta errores
        if (response.success) {
            toast.success(response.message);
            // manejo de colecciones update
            updateListProject({
                projectId: projectId,
                name: data.name,
                description: data.description,
                clientId: 0
            })
            // restableser formulario
            form.reset();
            // cerrar modal
            document.getElementById(`modalUpdate-${projectId}`)?.click();
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
        handleUpdateProject
    }
}
