"use client"

import action_create_task from "@/actions/tasks/action_create_task";
import { validationTask } from "@/validations";
import { useState } from "react";
import { toast } from "react-toastify";

export default function useCreateTask() {

    const [getNewTask, setNewTask] = useState<typeTaskRequest>()

    const handleCreateTask = async (e: React.FormEvent<HTMLFormElement>, projectId: number) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(e.currentTarget);

        const data: typeTaskResponse = {
            title: formData.get('title') as string,
            description: formData.get('description') as string,
            projectId: Number(projectId),
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

        const response = await action_create_task(data as typeTaskResponse, token);

        // manejo de respuesta errores
        if (response.success) {
            toast.success(response.message);
            setNewTask(response.newTask);

            // restableser formulario
            form.reset();
            // cerrar modal
            document.getElementById("modalCreate")?.click();
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
        handleCreateTask,
        getNewTask
    }
}
