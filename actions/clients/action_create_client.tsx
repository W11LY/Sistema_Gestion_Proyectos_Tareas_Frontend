"use server"

// creacion de client o register de acount
export default async function action_create_client(data: typeClientResponse): Promise<{ success: boolean; message: string, errors?: string[]; }> {
    try {
        const res = await fetch('http://localhost:8080/wily/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        // retorna no content no hay error
        if (res.status === 204 || res.status === 201) {
            return { success: true, message: 'Se ha registrado correctamente' };
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
                    message: result.message || 'Error de validación',
                    errors,
                };
            }
            errorMessage = result.message || errorMessage;
        } else if (contentType.includes('text/plain')) {
            // El backend responde texto plano manejamos errores
            errorMessage = await res.text();
        }

        return {
            success: false,
            message: errorMessage,
        };

    } catch (error: any) {
        return {
            success: false,
            message: error.message || 'Error de red',
        };
    }
}