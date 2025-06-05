"use server"

// autentificacion y obtencion del token
export default async function action_login(data: typeLogin): Promise<{ success: boolean; message: string, errors?: string[]; token?: string }> {
    try {
        const res = await fetch(`http://localhost:8080/wily/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
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

        return { success: true, message: result.message || 'Bienvenido', token: result.token };
    } catch (error: any) {
        return { success: false, message: error.message || 'Error de red' };
    }
}
