'use client';

import { 
    initCloudStorage, 
    initMiniApp,
    initSwipeBehavior,
    useViewport
} from "@telegram-apps/sdk-react";
import { ReactNode, useEffect } from "react";


export default function TelegramProvider({ children }: { children: ReactNode }) {
    const [miniApp] = initMiniApp();
    const cloudStorage = initCloudStorage();
    const [swipeBehavior] = initSwipeBehavior();
    const viewport = useViewport()

    useEffect(() => {
        if (viewport) {
            viewport.expand();
        }
        swipeBehavior.disableVerticalSwipe();
    }, []);

    useEffect(() => {
        cloudStorage.get('phone-number').then((storedPhoneNumber: string | null) => {
            if (!storedPhoneNumber) {
                miniApp.requestContact().then(contact => {
                    const phoneNumber = contact.contact.phoneNumber;
                    cloudStorage.set('phone-number', phoneNumber)
                });
            }
        })
    },[])

    return (
        <>
            {children}
        </>
    ) 
}
