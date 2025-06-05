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
            return { success: true, message: 'Se ha actualizado correctamente' };
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

        return { success: true, message: 'Se ha actualizado correctamente' };
    } catch (error: any) {
        return { success: false, message: error.message || 'Error de red' };
    }
}
