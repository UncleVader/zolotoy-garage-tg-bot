'use client';

import { 
    initSwipeBehavior,
    useViewport
} from "@telegram-apps/sdk-react";
import { ReactNode, useEffect } from "react";


export default function TelegramProvider({ children }: { children: ReactNode }) {
    const [swipeBehavior] = initSwipeBehavior();
    const viewport = useViewport()

    useEffect(() => {
        if (viewport) {
            viewport.expand();
        }
        swipeBehavior.disableVerticalSwipe();
    }, []);

    return (
        <>
            {children}
        </>
    ) 
}
