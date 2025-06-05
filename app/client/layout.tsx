"use client"

import MenuOptions from "@/src/components/MenuOptions";

export default function layout_client({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <div className="flex justify-center items-center w-full h-full">
            <div className="container relative h-3/4 overflow-y-auto flex">
                <div className="w-1/4">
                    <MenuOptions />
                </div>
                <div className="w-3/4 py-5 md:p-5">
                    {children}
                </div>
            </div>
        </div>
    )
}
