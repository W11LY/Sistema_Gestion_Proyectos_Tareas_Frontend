"use server"

// creaacion de project retorna el backend un objeto creado
export default async function action_create_project(data: typeProjectResponse, token: string): Promise<{ success: boolean; message: string; errors?: string[]; newProject?: typeProjectRequest }> {
    try {
        const res = await fetch(`http://localhost:8080/wily/api/projects`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,

            },
            body: JSON.stringify(data),
        });

        // leemos encabezado de headder
        const contentType = res.headers.get('content-type') || '';

        let errorMessage = 'Error desconocido';

        if (contentType.includes('application/json')) {
            // El backend responde JSON manejamos errores
            const result = await res.json();

            if (Array.isArray(result.errors)) {
                const errors = result.errors.map((err: any) => err.defaultMessage || 'Error desconocido');
                return {
                    success: false,
                    message: result.message || 'Error al crear el proyecto intente nuevamente',
                    errors,
                };
            } else {
                return {
                    success: true,
                    message: result.message || 'Proyecto creado exitosamente',
                    newProject: result
                };
            }
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
