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
            return { success: true, message: 'proyecto eliminada correctamente' };
        }

        // leemos encabezado de headder
        const contentType = res.headers.get('content-type') || '';

        let errorMessage = 'Error desconocido';

        if (contentType.includes('application/json')) {
            // El backend responde JSON manejamos errores
            const result = await res.json();

            return {
                success: true,
                message: result.message || 'Proyecto eliminado correctamente',
            };
        } else if (contentType.includes('text/plain')) {
            // El backend responde texto plano manejamos errores
            errorMessage = await res.text();
        }

        return {
            success: false,
            message: errorMessage,
        };
    } catch (error: any) {
        return { success: false, message: error.message || 'Error de red' };
    }
}
