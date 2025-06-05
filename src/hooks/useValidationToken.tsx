"use client";

import action_validation_token from "@/actions/action_validation_token";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function useValidationToken() {
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        // validacion del token por url
        const loadValidToken = async () => {
            const token = localStorage.getItem("token");

            // de no existir token y no estar en una de las dos url redirecciona
            if (!token) {
                if (pathname !== "/auth/login" && pathname !== "/auth/register") {
                    router.push("/auth/login");
                }
                return;
            }

            const res = await action_validation_token(token);
            // si caduca el token redirrecion dependiendo de la url
            if (!res.success) {
                toast.error(res.message || "Sesión caducada, inicia sesión nuevamente");
                setTimeout(() => {
                    localStorage.removeItem("token");
                    if (pathname !== "/auth/login" && pathname !== "/auth/register") {
                        router.push("/auth/login");
                    }
                }, 500);
            }
        };

        loadValidToken();
    }, [router, pathname]);
}
