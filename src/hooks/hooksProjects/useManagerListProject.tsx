"use client"

import action_getall_project from "@/actions/projects/action_getall_project";
import { useEffect, useState } from "react"
import { toast } from "react-toastify";

export default function useManagerListProject() {
    const [getListProject, setListProject] = useState<typeProjectRequest[]>([])

    // get de projectos por cliente
    useEffect(() => {
        const loadProjects = async () => {
            const token = localStorage.getItem("token");
            if (!token) return
            const res = await action_getall_project(token);
            if (res.success) {
                setListProject(res.data as []);
            } else {
                toast.error(res.message || "Error al cargar los proyectos");
            }
        };

        loadProjects();
    }, [])


    // manejo de colecciones add
    const addListProject = (data: typeProjectRequest) => setListProject(prev => [...prev, data]);

    // manejo de colecciones update
    const updateListProject = (data: typeProjectRequest) =>
        setListProject(prev =>
            prev.map(project =>
                project.projectId === data.projectId ? { ...project, name: data.name, description: data.description } : project
            )
        );

    // manejo de colecciones delete
    const deleteListProject = (idProject: number) => setListProject(prev => prev.filter(project => project.projectId !== idProject));

    return {
        getListProject,
        addListProject,
        updateListProject,
        deleteListProject
    }
}
