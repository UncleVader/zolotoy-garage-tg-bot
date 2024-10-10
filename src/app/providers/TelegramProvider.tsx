'use client';

import { 
    bindThemeParamsCSSVars, 
    bindViewportCSSVars, 
    initCloudStorage, 
    initMiniApp, 
    initSwipeBehavior, 
    useThemeParams, 
    useViewport 
} from "@telegram-apps/sdk-react";
import { ReactNode, useEffect } from "react";


export default function TelegramProvider({ children }: { children: ReactNode }) {
    const viewport = useViewport()
    const themeParams = useThemeParams();
    const [miniApp] = initMiniApp();
    const cloudStorage = initCloudStorage();

    useEffect(() => {
        if (viewport) {
          return bindViewportCSSVars(viewport);
        }
    }, [viewport]);
    
    useEffect(() => {
        if (themeParams.bgColor) {
            miniApp.setHeaderColor(themeParams.bgColor)
            miniApp.setBgColor(themeParams.bgColor)
        }
        return bindThemeParamsCSSVars(themeParams);
    }, [themeParams]);

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
