'use client'

import {useEffect, useRef, useState} from "react";
import {initCloudStorage, initHapticFeedback, useInitData} from "@telegram-apps/sdk-react";
import CarInfoModal from "./components/CarInfoModal";
import CarSelect from "./components/CarSelect";
import {TCarHistoryResponse} from "./types";
import axios from "axios";

export default function Home() {
  const [isInfoOpened, setIsInfoOpened] = useState(false)
  const [carInfo, setCarInfo] = useState<TCarHistoryResponse | null>(null)
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);

  const hapticFeedback = initHapticFeedback()
  const initData = useInitData()
  const cloudStorage = initCloudStorage();

  const handleOpenInfo = (newCarInfo: TCarHistoryResponse) => {
    hapticFeedback.impactOccurred("medium")
    if (!carInfo || newCarInfo.carName != carInfo.carName) {
      setCarInfo(newCarInfo)
    }
    setIsInfoOpened(true)
  }

  const handleCloseInfo = () => {
    hapticFeedback.impactOccurred("medium")
    setIsInfoOpened(false)
  }

  useEffect(() => {
    cloudStorage.get('phone-number').then((storedPhoneNumber) => {
      setPhoneNumber(storedPhoneNumber);
    }).catch((error) => {
      console.error('Error fetching phone number from cloudStorage:', error)
    });
  }, []);

  const fetchCarHistories = async (phoneNumber: string) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_APP_URI}/api/getCarHitoriesForAllCars?phone=${phoneNumber || ""}`)
    return response.data as TCarHistoryResponse[] | null
  }

  const [data, setData] = useState<unknown>()
  const [isLoading, setIsLoading] = useState(true)
  const fetchStarted = useRef(false)

  useEffect(() => {
    if (!phoneNumber || fetchStarted.current) return;
    fetchStarted.current = true

    fetchCarHistories(phoneNumber)
      .then((res: unknown) => {
        setData(res)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [phoneNumber])

  return (
    <main className="flex flex-col gap-y-5">
      <p className="font-bold text-base">
        Вітаю {(initData?.user?.firstName + ' ' + initData?.user?.lastName)?.trim()},
        це історія обслуговування ваших авто
      </p>

      <div className="flex flex-col gap-y-4">

        {isLoading ? (
          <>
            <div className="w-full h-24 bg-tg-theme-hint-color rounded-xl animate-pulse"/>
            <div className="w-full h-24 bg-tg-theme-hint-color rounded-xl animate-pulse"/>
            <div className="w-full h-24 bg-tg-theme-hint-color rounded-xl animate-pulse"/>
          </>
        ) : data && (data?.length || 0) > 0 ? (
          data.map((carHistory, index) => (
            <CarSelect
              key={index}
              carName={carHistory.carName}
              carOperationsNumber={carHistory.carHistoryData?.length || 0}
              lastOperation={carHistory.carHistoryData?.slice(-1)[0]?.date || 'No history'}
              carMileage={carHistory.carMileage}
              onClick={() => handleOpenInfo(carHistory)}
            />
          ))
        ) : (
          <p>Вибачте, але ми не можемо знайти ваші автомобілі</p>
        )}
      </div>

      <CarInfoModal
        isOpened={isInfoOpened}
        handleClose={handleCloseInfo}
        carInfo={carInfo}
      />
    </main>
  );
}
