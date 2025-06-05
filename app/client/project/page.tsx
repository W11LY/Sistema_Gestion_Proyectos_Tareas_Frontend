"use client"

import CardProject from "@/src/components/CardProject";
import FormTask_Project from "@/src/components/FormTask_Project";
import Modal from "@/src/components/Modal";
import useCreateProject from "@/src/hooks/hooksProjects/useCreateProject";
import useManagerListProject from "@/src/hooks/hooksProjects/useManagerListProject";
import useValidationToken from "@/src/hooks/useValidationToken";
import { useEffect } from "react";

export default function page_project() {

      useValidationToken();
  const { handleCreateProject, getNewProject } = useCreateProject();
  const { getListProject, addListProject, updateListProject, deleteListProject } = useManagerListProject();

  useEffect(() => {
    if (getNewProject) {
      addListProject(getNewProject);
    }
  }, [getNewProject]);


  return (
    <div className="pr-2">
      <label htmlFor="modalCreate" className="buttonConfigAll">Crear Proyecto</label>
      <Modal modalId="modalCreate" children={
        <form onSubmit={handleCreateProject}>
          <FormTask_Project titleModal="Crear Proyecto" />
          <input type="submit" className="buttonConfig mt-4" value="Crear" />
        </form>
      } />
      
      <div className="w-full h-min grid lg:grid-cols-2 xl:grid-cols-3 grid-flow-row overflow-y-auto gap-5 md:p-5 pt-5">
        {
          getListProject.map((projects) =>
            <CardProject
              key={projects.projectId}
              objectProject={projects}
              updateListProject={updateListProject}
              deleteListProject={deleteListProject}
            />)
        }
      </div>
    </div>
  )
}
