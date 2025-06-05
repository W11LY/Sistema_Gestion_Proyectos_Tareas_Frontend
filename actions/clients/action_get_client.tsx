"use server"

// get al client para manejo en profile
export default async function action_get_client(token: string): Promise<{ success: boolean; message?: string; data?: typeClientRequest; }> {

    try {
        const res = await fetch('http://localhost:8080/wily/api/client', {
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
                    message: result.message || 'Error al cargar el perfil',
                };
            } else {
                return {
                    success: true,
                    message: result.message || 'Perfil cargado exitosamente',
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