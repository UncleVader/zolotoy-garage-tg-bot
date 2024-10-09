'use client'

import {useEffect, useState} from "react";
import {initCloudStorage, initHapticFeedback, useInitData} from "@telegram-apps/sdk-react";
import CarInfoModal from "./components/CarInfoModal";
import CarSelect from "./components/CarSelect";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { TCarHistory, TCarHistoryResponse } from "./types";

export default function Home() {
  const [isInfoOpened, setIsInfoOpened] = useState(false)
  const [carInfo, setCarInfo] = useState<TCarHistory | null>(null)
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);

  const hapticFeedback = initHapticFeedback()
  const initData = useInitData()
  const cloudStorage = initCloudStorage();

  const handleOpenInfo = (newCarInfo: TCarHistory) => {
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

  const fetchCarHistories = async () => {
    if (!phoneNumber) return null;

    const response = await axios.get(`${process.env.NEXT_PUBLIC_APP_URI}/api/getCarHitoriesForAllCars?phone=${phoneNumber || ""}`)
    return response.data as TCarHistoryResponse | null
  }

  const { data, isLoading, isError  } = useQuery({
    queryKey: ['fetch car histories'],
    queryFn: () => fetchCarHistories(),
    enabled: !!phoneNumber
	})

  useEffect(() => {console.log(data)}, [data])

  return (
    <main className="flex flex-col gap-y-5">
      <p className="font-bold text-base">
        Вітаю {(initData?.user?.firstName + ' ' + initData?.user?.lastName)?.trim()},
        це історія обслуговування ваших авто
      </p>

      <div className="flex flex-col gap-y-4">
        {isLoading ? (
          <>
            <div className="w-full h-24 bg-tg-theme-hint-color rounded-xl animate-pulse" />
            <div className="w-full h-24 bg-tg-theme-hint-color rounded-xl animate-pulse" />
            <div className="w-full h-24 bg-tg-theme-hint-color rounded-xl animate-pulse" />
          </>
        ) : isError ? (
          <p>Вибачте, сталася помилка при отриманні даних</p>
        ) : data && data?.carList?.length > 0 ? (
          data.carList.map((car, index) => (
            <CarSelect
              key={index}
              carName={car.carHistory.carName}
              carOperationsNumber={car.carHistory.carHistoryData.length || 0}
              lastOperation={car.carHistory.carHistoryData?.slice(-1)[0]?.date || "No history"}
              carMileage={car.carHistory.carMileage}
              onClick={() => handleOpenInfo(car.carHistory)}
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
