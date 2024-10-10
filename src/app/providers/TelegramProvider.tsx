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
    const [swipeBehavior] = initSwipeBehavior();

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
        const appContent = document.getElementById('appContent');

        if (!appContent || !(appContent instanceof HTMLElement)) return;

        const isScrollable = () => {
            return appContent.scrollHeight > appContent.clientHeight;
        };

        const handleTouchStart = (e: TouchEvent) => {
            if (appContent.contains(e.target as Node) && isScrollable()) {
                swipeBehavior.disableVerticalSwipe();
            } else {
                swipeBehavior.enableVerticalSwipe();
            }
        };

        const handleTouchEnd = () => {
            swipeBehavior.enableVerticalSwipe();
        };

        document.addEventListener('touchstart', handleTouchStart, { passive: false });
        document.addEventListener('touchend', handleTouchEnd, { passive: false });

        return () => {
            document.removeEventListener('touchstart', handleTouchStart);
            document.removeEventListener('touchend', handleTouchEnd);
        };
    }, [swipeBehavior]);

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
