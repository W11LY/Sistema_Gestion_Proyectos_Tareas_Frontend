"use server"

// obtiene todos los project enlasados al client
export default async function action_getall_project(token: string): Promise<{ success: boolean; message?: string; data?: typeProjectRequest[]; }> {

    try {
        const res = await fetch('http://localhost:8080/wily/api/projects/projects', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        const result = await res.json();

        if (!res.ok) {
            return { success: false, message: result.message || 'No se pudo cargar los proyectos' };
        }

        return { success: true, data: result };
    } catch (error: any) {
        return { success: false, message: error.message || 'Error de red' };
    }
}