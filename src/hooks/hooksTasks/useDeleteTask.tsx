"use client"

import action_delete_task from "@/actions/tasks/action_delete_task";
import { toast } from "react-toastify";

export default function useDeleteTask() {
    const handleDeleteTask = async (e: React.FormEvent<HTMLFormElement>, taskId: number, deleteListTask: (idTask: number) => void) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(e.currentTarget);

        if (formData.get('delete') == "Eliminar") {
            // manejo de token
            const token = localStorage.getItem("token");
            if (!token) return
            const response = await action_delete_task(taskId, token);

            // manejo de respuesta errores
            if (response.success) {
                toast.success(response.message)
                deleteListTask(taskId)
                // restableser formulario
                form.reset();
                // cerrar modal
                document.getElementById(`modalDelete-${taskId}`)?.click();
            } else {
                toast.error(response.message);
            }
        } else {
            toast.error("Para Eliminar la tarea escriba: Eliminar")
        }
    }

    return {
        handleDeleteTask
    }
}
