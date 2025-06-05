"use server"

// delete de client o acount
export default async function action_delete_client(token: string): Promise<{ success: boolean; message: string }> {
    try {
        const res = await fetch(`http://localhost:8080/wily/api/client`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        // retorna no content no hay error
        if (res.status === 204) {
            return { success: true, message: 'cuenta eliminada correctamente' };
        }

        const result = await res.json();

        if (!res.ok) {
            return {
                success: false,
                message: result.message || 'Error de validación',
            };
        }

        return { success: true, message: result.message || 'cuenta eliminada correctamente' };
    } catch (error: any) {
        return { success: false, message: error.message || 'Error de red' };
    }
}
