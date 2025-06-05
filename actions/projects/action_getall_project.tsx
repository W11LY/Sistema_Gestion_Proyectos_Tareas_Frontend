"use server"

// obtiene todos los project enlasados al client
export default async function action_getall_project(token: string): Promise<{ success: boolean; message?: string; data?: typeProjectRequest[]; }> {

    try {
        const res = await fetch('http://localhost:8080/wily/api/projects/projects', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        // leemos encabezado de headder
        const contentType = res.headers.get('content-type') || '';

        let errorMessage = 'Error desconocido';

        if (contentType.includes('application/json')) {
            // El backend responde JSON manejamos errores
            const result = await res.json();

            if (Array.isArray(result.errors)) {
                return {
                    success: false,
                    message: result.message || 'Error al cargar los proyectos',
                };
            } else {
                return {
                    success: true,
                    message: result.message || 'Proyectos cargados',
                    data: result
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