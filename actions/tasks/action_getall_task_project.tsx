"use server"

// obtiene todas las task enlasadas al project
export default async function action_getall_task_project(idTask: string, token: string): Promise<{ success: boolean; message?: string; data?: typeTaskRequest[]; }> {

    try {
        const res = await fetch(`http://localhost:8080/wily/api/tasks/${idTask}/tasks`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        const result = await res.json();

        if (!res.ok) {
            return { success: false, message: result.message || 'No se pudo cargar las tareas' };
        }

        return { success: true, data: result };
    } catch (error: any) {
        return { success: false, message: error.message || 'Error de red' };
    }
}
