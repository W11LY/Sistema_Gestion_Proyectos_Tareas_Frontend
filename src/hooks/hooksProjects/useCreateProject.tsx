import action_create_project from "@/actions/projects/action_create_project";
import { validationProject } from "@/validations";
import { useState } from "react";
import { toast } from "react-toastify";

export default function useCreateProject() {

    const [getNewProject, setNewProject] = useState<typeProjectRequest>()

    const handleCreateProject = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(e.currentTarget);

        const data: typeProjectResponse = {
            name: formData.get('title') as string,
            description: formData.get('description') as string,
            clientId: 3
        }

        // validaciones con ZOD
        const result = validationProject.safeParse(data)
        if (!result.success) {
            result.error.issues.forEach((issue) => {
                toast.error(issue.message)
            })
            return
        }

        // manejo de token
        const token = localStorage.getItem("token");
        if (!token) return

        const response = await action_create_project(data as typeProjectResponse, token);

        // manejo de respuesta errores
        if (response.success) {
            toast.success(response.message);
            setNewProject(response.newProject);

            // restableser formulario
            form.reset();
            // cerrar modal
            document.getElementById("modalCreate")?.click();
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
        handleCreateProject,
        getNewProject
    }
}
