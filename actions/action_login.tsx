"use server"

// autentificacion y obtencion del token
export default async function action_login(data: typeLogin): Promise<{ success: boolean; message: string, errors?: string[]; token?: string }> {
    try {
        const res = await fetch(`http://localhost:8080/wily/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
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
                    message: result.message || 'Error de validación',
                    errors,
                };
            } else {
                return { 
                    success: true, 
                    message: result.message || 'Bienvenido', 
                    token: result.token
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
