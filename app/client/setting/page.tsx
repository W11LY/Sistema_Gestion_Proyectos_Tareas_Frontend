"use client"

import useDeleteProfile from "@/src/hooks/hooksProfile/useDeleteProfile";
import useUpdatePassword from "@/src/hooks/hooksProfile/useUpdatePassword";
import useValidationToken from "@/src/hooks/useValidationToken";

export default function page_stting() {

  useValidationToken();
  const { handleDeleteProfile } = useDeleteProfile();
  const { handleUpdatePassword } = useUpdatePassword();


  return (
    <div className="flex flex-col gap-5 pr-2">
      <div className="collapse bg-primero text-white text-xl p-1">
        <input type="checkbox" />
        <div className="collapse-title font-semibold">Actualizar Contraseña.</div>
        <div className="collapse-content text-sm bg-segundo">
          <div className="md:p-4 py-6 rounded-lg lg:p-8">
            <form onSubmit={handleUpdatePassword} className="flex flex-col gap-5">
              <input type="password" placeholder="Contraseña Actual" name="password1" className="inputConfig" />
              <input type="password" placeholder="Nueva Contraseña" name="password2" className="inputConfig" />
              <input type="password" placeholder="Confirmar Contraseña" name="password3" className="inputConfig" />
              <input type="submit" className="buttonConfig" value="Actualizar Contraseña" />
            </form>
          </div>
        </div>
      </div>
      
      <div className="collapse bg-primero text-white text-xl p-1">
        <input type="checkbox" />
        <div className="collapse-title font-semibold">Eliminar Cuenta.</div>
        <div className="collapse-content text-sm bg-segundo">
          <form onSubmit={handleDeleteProfile}>
            <div className="flex items-center justify-center ">
              <div className="mt-4 text-center">
                <h3 className="text-xl text-primero font-bold" id="modal-title">Eliminar Cuenca</h3>
                <p className="mt-2 text-lg text-primero">Si elimina la cuenta se eliminara por completo y no podra recuperarla.</p>
              </div>
            </div>

            <div className="mt-4">
              <input type="text" name="delete" placeholder="Para eliminar escriba: Eliminar" className="inputConfig"/>
              <input type="submit" className="buttonConfig mt-4" value="Eliminar Cuenta" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
