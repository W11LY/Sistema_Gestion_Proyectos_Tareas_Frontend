"use client"

import action_update_state_task from "@/actions/tasks/action_update_state_task";
import { toast } from "react-toastify";

export default function useUpdateStateTask() {
    const handleUpdateStateTask = async (taskId: number, taskSate: boolean, updateListTaskByState: (idTask: number, state: boolean) => void) => {
        // manejo de token
        const token = localStorage.getItem("token");
        if (!token) return

        const response = await action_update_state_task(taskId, taskSate, token);

        // manejo de respuesta errores
        if (response.success) {
            toast.success(response.message)
            updateListTaskByState(taskId, taskSate);
        } else {
            toast.error(response.message);
        }
    }

    return {
        handleUpdateStateTask
    }
}
