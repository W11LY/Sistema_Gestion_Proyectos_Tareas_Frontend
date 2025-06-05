"use client"

import useValidationToken from "@/src/hooks/useValidationToken"

export default function page_client() {

    useValidationToken();

    return (
        <div className="w-full h-full shadow-2xl bg-tercero rounded-lg flex justify-center items-center">
            <img src="https://img.icons8.com/?size=100&id=YYYhFVbH4vFv&format=png&color=000000" alt="logo" className="mx-auto w-40" />
        </div>
    )
}
