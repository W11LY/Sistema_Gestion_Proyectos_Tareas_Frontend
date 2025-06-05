"use client"

import FormTask_Project from "./FormTask_Project";
import Modal from "./Modal";
import useUpdateProject from "../hooks/hooksProjects/useUpdateProject";
import useDeleteProject from "../hooks/hooksProjects/useDeleteProject";

type cardProjectProp = {
    objectProject: typeProjectRequest;
    updateListProject: (data: typeProjectRequest) => void,
    deleteListProject: (idProject: number) => void
}

export default function CardProject({ objectProject, updateListProject, deleteListProject }: cardProjectProp) {

    const { handleUpdateProject } = useUpdateProject();
    const { handleDeleteProject } = useDeleteProject();

    return (
        <>
            <a href={`/client/task/${objectProject.projectId}`} className="w-full px-4 py-3 bg-white rounded-md shadow-md h-min">
                <div>
                    <h1 className="mt-2 text-xl font-semibold text-segundo">{objectProject.name}</h1>
                    <p className="mt-2 text-sm font-bold text-primero">{objectProject.description}</p>
                </div>

                <div>
                    <div className="flex items-center justify-end mt-4">
                        <label className="mr-2 text-gray-800 cursor-pointer hover:text-gray-700" htmlFor={`modalDelete-${objectProject.projectId}`} aria-label="twitter link">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash w-7 h-7"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                        </label>

                        <label className="mr-2 text-gray-800 cursor-pointer hover:text-gray-700" htmlFor={`modalUpdate-${objectProject.projectId}`} aria-label="share link">
                           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-edit w-7 h-7"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
                         </label>
                    </div>
                </div>
            </a>

            <Modal modalId={`modalUpdate-${objectProject.projectId}`} children={
                <form onSubmit={e => handleUpdateProject(e, objectProject.projectId, updateListProject)}>
                    <FormTask_Project titleData={objectProject.name} descriptionData={objectProject.description} titleModal="Actualizar Proyecto" />
                    <input className="buttonConfig mt-5" type="submit" value="Actualizar" />
                </form>
            } />

            <Modal modalId={`modalDelete-${objectProject.projectId}`} children={
                <form onSubmit={e => handleDeleteProject(e, objectProject.projectId, deleteListProject)}>
                    <div className="flex items-center justify-center">
                        <div className="mt-4 text-center">
                            <h3 className="text-xl text-white" id="modal-title">Eliminar Proyecto</h3>
                            <p className="mt-2 text-sm text-gray-400">Si elimina el proyecto se eliminara por completo y no podra recuperarla.</p>
                        </div>
                    </div>

                    <div className="mt-4">
                        <input type="text" name="delete" placeholder="Para eliminar escriba: Eliminar" className="inputConfig" />
                        <input type="submit" className="buttonConfig mt-3" value="Crear" />
                    </div>
                </form>
            } />

        </>
    )
}
