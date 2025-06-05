"use server"

// actualizacion de client usado en el profile
export default async function action_update_client(data: typeClientResponse, token: string): Promise<{ success: boolean; message: string, errors?: string[]; }> {
    try {
        console.log(data)
        const res = await fetch('http://localhost:8080/wily/api/client', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        // retorna no content no hay error
        if (res.status === 204) {
            return { success: true, message: 'Perfil actualizado correctamente' };
        }

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
                    message: result.message || 'Error al actualizar el perfil intente nuevamente',
                    errors,
                };
            } else {
                return {
                    success: true,
                    message: result.message || 'Perfil actualizada correctamente',
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
