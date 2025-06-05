"use client"

import FormProfile from "@/src/components/FormProfile";
import useManagerProfile from "@/src/hooks/hooksProfile/useManagerProfile";
import useUpdateProfile from "@/src/hooks/hooksProfile/useUpdateProfile";
import useValidationToken from "@/src/hooks/useValidationToken";
import { useState } from "react";

export default function page_profile() {

  useValidationToken();
  const [getStateUpdate, setStateUpdate] = useState<boolean>(false);
  const { handleUpdateProfile } = useUpdateProfile();
  const { getClient, updateClient, } = useManagerProfile();

  return (
    <div className="w-full h-full flex flex-col pt-10 items-center">
      <div className="w-full md:w-3/4 lg:w-1/2 p-5">
        <form onSubmit={e => handleUpdateProfile(e, setStateUpdate, updateClient)} >
          <h1 className="text-2xl md:text-3xl text-white text-center mb-3">Actualizar Perfil</h1>
          <div className="w-full">
            <img src="https://img.icons8.com/?size=100&id=Z5Cz9gML8rsf&format=png&color=000000" alt="logo" className="mx-auto w-40" />
          </div>
          <FormProfile getClient={getClient} type="update" getStateUpdate={getStateUpdate} />
          {getStateUpdate && <input type="submit" className="buttonConfig mt-4" value="Guardar" />}
        </form>
        {!getStateUpdate && <button onClick={() => setStateUpdate(!getStateUpdate)} className="buttonConfig mt-4" >Actualizar</button>}
      </div>
    </div>
  )
}
