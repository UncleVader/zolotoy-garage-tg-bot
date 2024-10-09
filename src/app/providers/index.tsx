'use client';

import dynamic from 'next/dynamic';
import { SDKProvider } from "@telegram-apps/sdk-react";
import { ReactNode, useEffect } from "react";
import ReactQueryProvider from "./ReactQueryProvider";

const TelegramProvider = dynamic(() => import('./TelegramProvider'), { ssr: false });

export default function Providers({ children }: { children: ReactNode }) {
    // preventing zoom by user
    useEffect(() => {
        const preventZoom = (event: TouchEvent | WheelEvent) => {
            if ((event as TouchEvent).touches && (event as TouchEvent).touches.length > 1) {
                event.preventDefault();
            } else if (event.ctrlKey || event.metaKey) {
                event.preventDefault();
            }
        };

        document.addEventListener('touchmove', preventZoom, { passive: false });
        document.addEventListener('wheel', preventZoom, { passive: false });

        return () => {
            document.removeEventListener('touchmove', preventZoom);
            document.removeEventListener('wheel', preventZoom);
        };
    }, []);
    
    return (
        <SDKProvider acceptCustomStyles debug>
            <ReactQueryProvider>
                <TelegramProvider>
                    {children}
                </TelegramProvider>
            </ReactQueryProvider>
        </SDKProvider>
    )
}