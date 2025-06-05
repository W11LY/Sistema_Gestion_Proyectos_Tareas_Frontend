import action_update_password from "@/actions/clients/action_update_password";
import { validationPassword } from "@/validations";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function useUpdatePassword() {
    const router = useRouter()

    const handleUpdatePassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(e.currentTarget);

        const data: typeUpdatePassword = {
            passwordOld: formData.get('password1') as string,
            passwordNew: formData.get('password2') as string,
        }


        // validaciones con ZOD
        const result = validationPassword.safeParse(data)
        if (!result.success) {
            result.error.issues.forEach((issue) => {
                toast.error(issue.message)
            })
            return
        }

        // validacion igualdad de new password
        if (data.passwordNew !== formData.get("password3")) {
            toast.error("Las contraseñas no son iguales");
            return
        }

        // manejo de token
        const token = localStorage.getItem("token");
        if (!token) return

        const response = await action_update_password(data as typeUpdatePassword, token);

        // manejo de respuesta errores
        if (response.success) {
            toast.success(response.message);
            // restableser formulario
            form.reset();
            // redireccionamiento
            setTimeout(() => {
                router.push('/auth/login')
            }, 500);
        } else {
            if (response.errors?.length) {
                // errores del back validaciones
                response.errors.forEach((err) => {
                    toast.error(err);
                });
            } else {
                toast.error(response.message);
            }
        }
    }

    return {
        handleUpdatePassword
    }
}