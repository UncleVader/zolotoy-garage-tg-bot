'use client'

import { initBackButton } from "@telegram-apps/sdk-react"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect } from "react"
import CarInfoDropdown from "./CarInfoDropdown"
import { TCarHistory } from "../types"

type TCarInfoModalProps = {
    isOpened: boolean,
    handleClose: () => void,
    carInfo: TCarHistory | null
}

export default function CarInfoModal({isOpened, handleClose, carInfo}:TCarInfoModalProps) {
    const [backButton] = initBackButton()

    useEffect(() => {
        if (isOpened) {
            backButton.show()
            backButton.on('click', () => {
                handleClose()
            });
        } else {
            backButton.hide()
        }
    }, [isOpened])

    return (
        <AnimatePresence>
        {
            isOpened && (
                <motion.div 
                initial={{opacity: 0, x:'100%'}}
                animate={{opacity: 1, x:0}}
                exit={{opacity: 0, x:'-100%'}}
                transition={{bounce: 0}}
                // className="fixed inset-0 bg-tg-bg-color z-[999] overflow-y-scroll"
                className="modal-window bg-tg-bg-color"
                >
                    <div className="flex flex-col gap-y-5 p-5 w-full">
                        <p className="font-bold text-xl">Історія обслуговування</p>

                        <p className="font-semibold text-lg">{carInfo?.carName}</p>

                        <div className="flex flex-col gap-y-4 w-full">
                            {
                                carInfo && carInfo.carHistoryData?.map((data, index) => (
                                    <CarInfoDropdown 
                                    key={index}
                                    carHistory={data}
                                    />
                                ))
                            }
                        </div>
                    </div>
                </motion.div>
            )
        }
        </AnimatePresence>
    )
}