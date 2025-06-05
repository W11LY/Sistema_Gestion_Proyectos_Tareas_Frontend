"use server"

// actualizacion del task menos del atributo state del object
export default async function action_update_task(data: typeTaskResponse, taskId: number, token: string): Promise<{ success: boolean; message: string, errors?: string[]; }> {
    try {
        const res = await fetch(`http://localhost:8080/wily/api/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        // retorna no content no hay error
        if (res.status === 204) {
            return { success: true, message: 'Tarea actualizada correctamente' };
        }

        const result = await res.json();

        if (!res.ok) {
            // manejo de errores del backend por validaciones devuelve list
            const errors = Array.isArray(result.errors)
                ? result.errors.map((err: any) => err.defaultMessage || 'Error desconocido')
                : [];

            return {
                success: false,
                message: result.message || 'Error de validación',
                errors,
            };
        }

        return { success: true, message: result.message || 'Tarea actualizada correctamente' };
    } catch (error: any) {
        return { success: false, message: error.message || 'Error de red' };
    }
}
