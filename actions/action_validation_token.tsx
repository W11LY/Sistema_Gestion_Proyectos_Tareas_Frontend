"use server"

// validacion del token y su expiracion
export default async function action_validation_token(token: string): Promise<{ success: boolean; message?: string; }> {

    try {
        const res = await fetch('http://localhost:8080/wily/api/auth/validate-token', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        // retorna no content no hay error
        if (res.status === 403) {
            return { success: false, message: 'Seccion Caducada' };
        }

        const result = await res.json();

        if (!res.ok) {
            return { success: false, message: result.message || 'No se pudo validar el token' };
        }

        return { success: true };
    } catch (error: any) {
        return { success: false, message: error.message || 'Error de red' };
    }
}