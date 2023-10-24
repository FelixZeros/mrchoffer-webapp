'use client'

import { AuthContext } from "@/auth/Auth-context"
import { AvatarIcon } from "@/components/icons/avatar"
import { useContext, useState } from "react"

export const HeaderAdmin = () => {
    const { user } = useContext(AuthContext)
    console.log( user )
    return <div className="h-[90px] mb-4 rounded flex justify-end font-bold items-center gap-2 shadow bg-white text-black px-10">
        {user?.company?.name}
        <div className="border bg-[--main-yellow] w-10 h-10 grid place-content-center rounded-full">
            <AvatarIcon />
        </div>

    </div>
}
