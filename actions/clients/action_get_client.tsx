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

        const result = await res.json();

        if (!res.ok) {
            return { success: false, message: result.message || 'No se pudo cargar los datos' };
        }

        return { success: true, data: result };
    } catch (error: any) {
        return { success: false, message: error.message || 'Error de red' };
    }
}