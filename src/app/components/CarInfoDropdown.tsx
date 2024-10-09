'use client'

import { initHapticFeedback } from "@telegram-apps/sdk-react"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import { useState } from "react"
import { TCarHistoryData } from "../types"

export default function CarInfoDropdown({carHistory}:{carHistory: TCarHistoryData}) {
    const hapticFeedback = initHapticFeedback()
    const [isExtended, setIsExtended] = useState(false)

    const toggleExtend = () => {
        hapticFeedback.impactOccurred("medium")
        setIsExtended(!isExtended)
    }

    return (
        <div className="w-full p-4 rounded-xl bg-tg-secondary-bg-color">
            <div 
            className="flex justify-between cursor-pointer"
            onClick={toggleExtend}
            >
                <div className="flex flex-col gap-y-1">
                    <p>{carHistory.rowName}</p>
                    <p className="text-tg-subtitle-text-color text-sm">{carHistory.date}</p>

                    <div className="flex gap-x-2 font-bold text-sm">
                        <p>Фірма: {carHistory.docFirm}</p>
                        {carHistory.docManager && <p>Менеджер: {carHistory.docManager}</p>}
                    </div>
                    <div className="flex gap-x-2 font-bold text-sm">
                        <p>Пробіг: {carHistory.carMileage} км.</p>
                        <p>Сума: {carHistory.docSum}</p>
                    </div>
                </div>

                <Image 
                src="/images/dropdown-arrow.svg"
                alt="extend arrow"
                width={15}
                height={15}
                className={`${isExtended ? 'rotate-180' : 'rotate-0'} transition-transform`}
                />
            </div>

            <div className="overflow-y-clip">
                <AnimatePresence>
                        {isExtended && 
                            (
                                <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                >
                                    <motion.div
                                    initial={{ y: '-100%' }}
                                    animate={{ y: 0 }}
                                    exit={{ y: '-100%' }}
                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                                    className="pt-4 flex flex-col gap-y-3"
                                    >
                                        <p className="text-xl font-bold">{carHistory.docInfo}</p>
                                        <ul className="flex flex-col gap-y-2">
                                            {carHistory.rowList.map((row, index) => (
                                                <li key={index} className={'flex justify-between text-sm'}>
                                                    <span>{`${index+1}. ${row.rowName}`}</span>
                                                    <span className={"whitespace-nowrap"}>{row.rowSum}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                </motion.div>
                            )
                        }
                </AnimatePresence>
            </div>
        </div>
    )
}