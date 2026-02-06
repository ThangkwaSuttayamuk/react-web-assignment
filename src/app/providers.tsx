"use client";

import { Provider } from "react-redux";
import { useEffect } from "react";
import { store } from "@/store";
import { setLanguage } from "@/features/home/home.slice";
import i18n from "i18next";
import "@/i18n/config";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const storedLanguage = localStorage.getItem("language") || "en";
    i18n.changeLanguage(storedLanguage);
    store.dispatch(setLanguage(storedLanguage));
  }, []);

  return <Provider store={store}>{children}</Provider>;
}