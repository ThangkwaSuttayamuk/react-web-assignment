"use client";

import { setLanguage } from "@/features/home/home.slice";
import "@/i18n/config";
import { store } from "@/store";
import i18n from "i18next";
import { useEffect } from "react";
import { Provider } from "react-redux";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const storedLanguage = localStorage.getItem("language") || "en";
    i18n.changeLanguage(storedLanguage);
    store.dispatch(setLanguage(storedLanguage));
  }, []);

  return <Provider store={store}>{children}</Provider>;
}