"use server"

// actualizacion unicamente del state de la task
export default async function action_update_state_task(taskId: number, stateTask: boolean, token: string): Promise<{ success: boolean; message: string, errors?: string[]; }> {
    try {
        const res = await fetch(`http://localhost:8080/wily/api/tasks/${taskId}/${stateTask}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        // retorna no content no hay error
        if (res.status === 204) {
            return { success: true, message: 'Estado de tarea actualizada correctamente' };
        }

        const result = await res.json();

        if (!res.ok) {
            return {
                success: false,
                message: result.message || 'Error de validación',
            };
        }

        return { success: true, message: result.message || 'Estado de tarea actualizada correctamente' };
    } catch (error: any) {
        return { success: false, message: error.message || 'Error de red' };
    }
}
