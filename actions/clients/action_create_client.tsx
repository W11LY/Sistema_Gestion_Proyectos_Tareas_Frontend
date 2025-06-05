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

        return { success: true, message: 'Se ha registrado correctamente' };
    } catch (error: any) {
        return { success: false, message: error.message || 'Error de red' };
    }
}
