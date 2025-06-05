"use client"

import action_update_task from "@/actions/tasks/action_update_task";
import { validationTask } from "@/validations";
import { toast } from "react-toastify";

export default function useUpdateTask() {
    const handleUpdateTask = async (e: React.FormEvent<HTMLFormElement>, taskId: number, updateListTask: (data: typeTaskRequest) => void) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(e.currentTarget);

        const data: typeTaskResponse = {
            title: formData.get('title') as string,
            description: formData.get('description') as string,
            projectId: 0,
            state: false
        }

        // validaciones con ZOD
        const result = validationTask.safeParse(data)
        if (!result.success) {
            result.error.issues.forEach((issue) => {
                toast.error(issue.message)
            })
            return
        }

        // manejo de token
        const token = localStorage.getItem("token");
        if (!token) return

        const response = await action_update_task(data as typeTaskResponse, taskId, token);

        // manejo de respuesta errores
        if (response.success) {
            toast.success(response.message);
            // manejo de colecciones update
            updateListTask({
                taskId: taskId,
                title: data.title,
                description: data.description,
                state: false,
                projectId: 0
            })
            // restableser formulario
            form.reset();
            // cerrar modal
            document.getElementById(`modalUpdate-${taskId}`)?.click();
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
        handleUpdateTask
    }
}
