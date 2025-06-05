import action_get_client from '@/actions/clients/action_get_client';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

export default function useManagerProfile() {
    const [getClient, setClient] = useState<typeClientRequest>()

    // obtencion de client para profile
    useEffect(() => {
        const loadClient = async () => {
            const token = localStorage.getItem("token");
            if (!token) return
            const res = await action_get_client(token);
            if (res.success) {
                setClient(res.data);
            } else {
                toast.error(res.message || "Error al cargar los datos");
            }
        };

        loadClient();
    }, [])

    // manejo de colecciones update
    const updateClient = (data: typeClientRequest) => setClient(prev => ({ ...prev, ...data }));

    return {
        getClient,
        updateClient,
    }
}
