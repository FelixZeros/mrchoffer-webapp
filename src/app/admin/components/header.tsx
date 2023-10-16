'use client'

import { AvatarIcon } from "@/components/icons/avatar"
import { useState } from "react"

export const HeaderAdmin = () => {

    const [companyName, setCompanyName] = useState<string>('Company')

    return <div className="h-[90px] mb-4 rounded flex justify-end font-bold items-center gap-2 shadow bg-white text-black px-10">
        {companyName}
        <div className="border bg-[--main-yellow] w-10 h-10 grid place-content-center rounded-full">
            <AvatarIcon />
        </div>

    </div>
}
