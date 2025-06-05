"use client"

import { useParams } from "next/navigation";
import CardTask from "@/src/components/CardTask";
import Modal from "@/src/components/Modal";
import FormTask_Project from "@/src/components/FormTask_Project";
import useManagerListTask from "@/src/hooks/hooksTasks/useManagerListTask";
import useCreateTask from "@/src/hooks/hooksTasks/useCreateTask";
import { useEffect } from "react";
import useValidationToken from "@/src/hooks/useValidationToken";

export default function page_task() {

      useValidationToken();
  const params = useParams();
  const projectId = params?.id as string;

  const { getListTask, addListTask, updateListTask, deleteListTask, updateListTaskByState } = useManagerListTask();
  const { handleCreateTask, getNewTask } = useCreateTask();

  useEffect(() => {
    if (getNewTask) {
      addListTask(getNewTask);
    }
  }, [getNewTask]);

  return (
    <div className="pr-2">
      <label htmlFor="modalCreate"className="buttonConfigAll">Crear Tarea</label>
      <Modal modalId="modalCreate" children={
        <form onSubmit={e => handleCreateTask(e, Number(projectId))}>
          <FormTask_Project titleModal="Crear Tarea" />
          <input type="submit" className="buttonConfig mt-4" value="Crear" />
        </form>
      } />

      <div className="w-full h-min grid lg:grid-cols-2 xl:grid-cols-3 grid-flow-row overflow-y-auto gap-5 md:p-5 pt-5">
        {getListTask.map((task) => <CardTask
          key={task.taskId}
          task={task}
          updateListTask={updateListTask}
          deleteListTask={deleteListTask}
          updateListTaskByState={updateListTaskByState}
        />)}
      </div>
    </div>
  )
}
