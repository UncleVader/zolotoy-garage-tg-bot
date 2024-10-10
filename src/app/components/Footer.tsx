'use client'

import { initUtils } from "@telegram-apps/sdk-react"
import { SocialIcon } from "react-social-icons"

export default function Footer() {
    const utils = initUtils()

    return (
        <footer className="flex w-full px-4 pb-4">
            <ul className="w-full flex justify-around">
                <li onClick={() => utils.openLink('https://www.instagram.com/zolotoy.garage')}>
                    <SocialIcon network="instagram" bgColor="transparent" fgColor="var(--tg-theme-button-color)"/>
                </li>
                <li onClick={() => utils.openTelegramLink('https://t.me/bmwgaragekyiv')}>
                    <SocialIcon network="telegram" bgColor="transparent" fgColor="var(--tg-theme-button-color)"/>
                </li>
                <li onClick={() => utils.openLink('https://zolotoygarage.com.ua')}>
                    <SocialIcon network="sharethis" bgColor="transparent" fgColor="var(--tg-theme-button-color)"/>
                </li>
            </ul>
        </footer>
    )
}