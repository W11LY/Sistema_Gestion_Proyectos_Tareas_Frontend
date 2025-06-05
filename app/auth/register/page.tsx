"use client"

import FormProfile from "@/src/components/FormProfile";
import useRegister from "@/src/hooks/useRegister";

export default function page_register() {

    const { handleCreateClient } = useRegister();

    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="w-[90%] md:w-3/4 lg:w-1/2 px-6 py-24 mx-auto lg:py-32">
                <h1 className="text-4xl text-white text-center mb-3">Registro</h1>
                <div className="w-full">
                    <img src="https://img.icons8.com/?size=100&id=LPk9CY756Am8&format=png&color=000000" alt="logo" className="mx-auto w-64" />
                </div>
                <form className="mx-auto" onSubmit={handleCreateClient}>
                    <FormProfile type="create" />
                    <input type="submit" className="buttonConfig my-5" value="Guardar" />
                </form>
            </div>
        </div>
    )
}
