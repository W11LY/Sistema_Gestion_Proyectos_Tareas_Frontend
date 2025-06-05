"use client"

import useLogin from "@/src/hooks/useLogin";

export default function page_login() {

    const { handleLogin } = useLogin();

    return (
        <section className="w-full h-full">
            <div className="w-[90%] flex items-center justify-center min-h-screen mx-auto">
                <form className="w-full max-w-md" onSubmit={handleLogin}>
                    <h1 className="text-4xl text-white text-center mb-3">Iniciar Seccion</h1>
                    <div className="w-full">
                        <img src="https://img.icons8.com/?size=100&id=To010AuI8b8P&format=png&color=000000" alt="logo" className="mx-auto w-40" />
                    </div>

                    <div className="relative flex items-center mt-8">
                        <span className="absolute">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </span>

                        <input type="email" className="inputConfigLogo" placeholder="Correo Electronico" name="email" />
                    </div>

                    <div className="relative flex items-center mt-4">
                        <span className="absolute">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </span>

                        <input type="password" className="inputConfigLogo" placeholder="Contraseña" name="password" />
                    </div>

                    <div className="mt-6">
                        <button className="buttonConfig">Iniciar Seccion</button>
                        <div className="mt-6 text-center ">
                            <a href="/auth/register" className="text-sm text-white hover:underline">No tienes cuenta? Registrate</a>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    )
}