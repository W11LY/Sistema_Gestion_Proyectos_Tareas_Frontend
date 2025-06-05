"use server"

// eliminacion del project
export default async function action_delete_project(projectId: number, token: string): Promise<{ success: boolean; message: string }> {
    try {
        const res = await fetch(`http://localhost:8080/wily/api/projects/${projectId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        // retorna no content no hay error
        if (res.status === 204) {
            return { success: true, message: 'projecto eliminada correctamente' };
        }

        const result = await res.json();

        if (!res.ok) {
            return {
                success: false,
                message: result.message || 'Error de validación',
            };
        }

        return { success: true, message: result.message || 'Tarea eliminada correctamente' };
    } catch (error: any) {
        return { success: false, message: error.message || 'Error de red' };
    }
}
