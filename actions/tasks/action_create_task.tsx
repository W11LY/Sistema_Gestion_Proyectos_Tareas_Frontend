"use server"

// creacion de task retorna un objeto
export default async function action_create_task(data: typeTaskResponse, token: string): Promise<{ success: boolean; message: string, errors?: string[]; newTask?: typeTaskRequest }> {
    try {
        const res = await fetch(`http://localhost:8080/wily/api/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

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

        return { success: true, message: result.message || 'Tarea actualizada correctamente', newTask: result };
    } catch (error: any) {
        return { success: false, message: error.message || 'Error de red' };
    }
}
