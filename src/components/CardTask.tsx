"use client"

import FormTask_Project from "./FormTask_Project";
import Modal from "./Modal";
import useUpdateTask from "../hooks/hooksTasks/useUpdateTask";
import useUpdateStateTask from "../hooks/hooksTasks/useUpdateStateTask";
import useDeleteTask from "../hooks/hooksTasks/useDeleteTask";

type cardTaskprop = {
    task: typeTaskRequest;
    updateListTask: (data: typeTaskRequest) => void;
    deleteListTask: (idTask: number) => void;
    updateListTaskByState: (idTask: number, state: boolean) => void;
}

export default function CardTask({ task, updateListTask, deleteListTask, updateListTaskByState }: cardTaskprop) {

    const { handleUpdateTask } = useUpdateTask();
    const { handleDeleteTask } = useDeleteTask();
    const { handleUpdateStateTask } = useUpdateStateTask();


    return (
        <>
            <div className="w-full overflow-hidden bg-white rounded-lg shadow-lg h-min" key={task.taskId}>
                <div className="flex items-center px-6 py-3 bg-primero">
                    <h1 className="mx-3 text-lg text-white">{task.title}</h1>
                </div>

                <div className="px-6 py-4">
                    <p className="py-2 text-primero text-lg">{task.description}</p>

                    <label className="flex items-center mt-4 text-segundo border-t-2 border-tercero shadow-xl p-2 hover:bg-primero/20" onClick={() => handleUpdateStateTask(task.taskId, !task.state, updateListTaskByState)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-dual-screen w-6 h-6"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 4l8 3v15l-8 -3z" /><path d="M13 19h6v-15h-14" /></svg>
                        <p className="px-2 text-sm">{!task.state ? "Finalizar Tarea" : "Reactivar Tarea"}</p>
                    </label>

                    <label className="flex items-center text-segundo border-t-2 border-tercero shadow-xl p-2 hover:bg-primero/20" htmlFor={`modalUpdate-${task.taskId}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-edit w-6 h-6"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
                        <p className="px-2 text-sm">Actualizar</p>
                    </label>

                    <label className="flex items-center text-segundo border-t-2 border-tercero shadow-xl p-2 hover:bg-primero/20" htmlFor={`modalDelete-${task.taskId}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash w-6 h-6"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                        <p className="px-2 text-sm">Eliminar</p>
                    </label>
                </div>
            </div>


            <Modal modalId={`modalUpdate-${task.taskId}`} children={
                <form onSubmit={e => handleUpdateTask(e, task.taskId, updateListTask)}>
                    <FormTask_Project titleData={task.title} descriptionData={task.description} titleModal="Actualizar Tarea" />
                    <input type="submit" className="buttonConfig mt-4" value="Actualizar" />
                </form>
            } />

            <Modal modalId={`modalDelete-${task.taskId}`} children={
                <form onSubmit={e => handleDeleteTask(e, task.taskId, deleteListTask)}>
                    <div className="flex items-center justify-center ">
                        <div className="mt-4 text-center">
                            <h3 className="text-xl text-white" id="modal-title">Eliminar Tarea</h3>
                            <p className="mt-2 text-sm text-gray-400">Si elimina la tarea se eliminara por completo y no podra recuperarla.</p>
                        </div>
                    </div>

                    <div className="mt-4">
                        <input type="text" placeholder="Para eliminar escriba: Eliminar" className="inputConfig"/>
                        <input type="submit" className="buttonConfig mt-3" value="Crear" />
                    </div>
                </form>
            } />
        </>
    )
}
