'use client'

import { openLink } from "@telegram-apps/sdk-react"
import Image from "next/image"

export default function Header() {

    return (
        <header className="w-full bg-[#222222] flex justify-center items-center shadow-header">
            <Image 
            src="/images/logo.png"
            alt="logo"
            width={140}
            height={175}
            className="rounded-xl w-1/3 min-[461px]:w-1/4 h-full cursor-pointer"
            onClick={() => openLink('https://zolotoygarage.com.ua')}
            />
        </header>
    )
}
