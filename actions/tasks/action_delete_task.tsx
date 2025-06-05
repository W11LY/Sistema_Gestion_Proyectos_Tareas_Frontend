"use server"

// elimina task por id
export default async function action_delete_task(taskId: number, token: string): Promise<{ success: boolean; message: string }> {
    try {
        const res = await fetch(`http://localhost:8080/wily/api/tasks/${taskId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        // retorna no content no hay error
        if (res.status === 204) {
            return { success: true, message: 'tarea eliminada correctamente' };
        }

        const result = await res.json();

        if (!res.ok) {
            return {
                success: false,
                message: result.message || 'Error de validación',
            };
        }

        return { success: true, message: result.message || 'Tarea actualizada correctamente' };
    } catch (error: any) {
        return { success: false, message: error.message || 'Error de red' };
    }
}
