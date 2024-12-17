'use client';

import {
  swipeBehavior,
  viewport
} from "@telegram-apps/sdk-react";
import {ReactNode, useEffect} from "react";


export default function TelegramProvider({children}: { children: ReactNode }) {

  useEffect(() => {
    if (viewport) {
      viewport.expand();
    }
    swipeBehavior.disableVertical();
  }, []);

  return (
    <>
      {children}
    </>
  )
}
