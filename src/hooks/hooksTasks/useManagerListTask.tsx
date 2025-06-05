"use client"

import action_getall_task_project from "@/actions/tasks/action_getall_task_project";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function useManagerListTask() {
    const params = useParams();
    const projectId = params?.id as string;

    const [getListTask, setListTask] = useState<typeTaskRequest[]>([])

    // cargar task por id project
    useEffect(() => {
        const loadTasks = async () => {
            const token = localStorage.getItem("token");
            if (!token) return
            const res = await action_getall_task_project(projectId, token);
            if (res.success) {
                setListTask(res.data as []);
            } else {
                toast.error(res.message || "Error al cargar las tareas");
            }
        };

        loadTasks();
    }, [])


    // manejo de colecciones add
    const addListTask = (data: typeTaskRequest) => setListTask(prev => [...prev, data]);

    // manejo de colecciones update
    const updateListTask = (data: typeTaskRequest) =>
        setListTask(prev =>
            prev.map(task =>
                task.taskId === data.taskId ? { ...task, title: data.title, description: data.description } : task
            )
        );

    // manejo de colecciones delete
    const deleteListTask = (idTask: number) => setListTask(prev => prev.filter(task => task.taskId !== idTask));

    // manejo de colecciones update state de task
    const updateListTaskByState = (idTask: number, state: boolean) =>
        setListTask(prev =>
            prev.map(task =>
                task.taskId === idTask ? { ...task, state: state } : task
            )
        );

    return {
        getListTask,
        addListTask,
        updateListTask,
        deleteListTask,
        updateListTaskByState
    }
}
