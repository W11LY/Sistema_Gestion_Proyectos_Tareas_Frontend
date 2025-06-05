"use client"

import action_delete_project from "@/actions/projects/action_delete_project";
import { toast } from "react-toastify";

export default function useDeleteProject() {
    const handleDeleteProject = async (e: React.FormEvent<HTMLFormElement>, projectId: number, deleteListProject: (idProject: number) => void) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(e.currentTarget);

        if (formData.get('delete') == "Eliminar") {
            // manejo de token
            const token = localStorage.getItem("token");
            if (!token) return

            const response = await action_delete_project(projectId, token);

            // manejo de respuesta errores
            if (response.success) {
                toast.success(response.message)
                deleteListProject(projectId)
                // restableser formulario
                form.reset();
                // cerrar modal
                document.getElementById(`modalDelete-${projectId}`)?.click();
            } else {
                toast.error(response.message);
            }
        } else {
            toast.error("Para Eliminar el projecto escriba: Eliminar")
        }
    }

    return {
        handleDeleteProject
    }
}
