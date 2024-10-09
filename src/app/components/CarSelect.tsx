'use client'

type TCarSelectProps = { 
    onClick: () => void,
    carName: string,
    carOperationsNumber: number,
    lastOperation: string,
    carMileage: number
}

export default function CarSelect({onClick, carName, carOperationsNumber, lastOperation, carMileage}:TCarSelectProps) {
    return (
        <div className="w-full p-4 rounded-xl bg-tg-secondary-bg-color flex flex-col gap-y-2">
            <p className="font-semibold text-lg">{carName}</p>

            <div className="flex gap-x-4 text-sm text-tg-subtitle-text-color">
                <p>Всього візитів: {carOperationsNumber}</p>
                <p>Останній візит: {lastOperation}</p>
            </div>

            <p>Пробіг автомобіля: {carMileage} км.</p>

            <button 
            onClick={onClick}
            className="font-roboto w-full bg-tg-button-color py-2 rounded-lg"
            >
                Дізнатись більше
            </button>
        </div>
    )
}