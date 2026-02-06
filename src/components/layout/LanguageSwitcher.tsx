"use client";

import { setLanguage } from "@/features/home/home.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Select } from "antd";
import i18n from "i18next";
import { useEffect, useState } from "react";
import styles from "./ LanguageSwitcher.module.scss";

export const LanguageSwitcher = () => {
  const dispatch = useAppDispatch();
  const language = useAppSelector(state => state.home.language);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (value: string) => {
    i18n.changeLanguage(value);
    dispatch(setLanguage(value));
  };

  if (!mounted) return null;

  return (
    <Select
      className={styles.select}
      value={language}
      onChange={handleChange}
      options={[
        { value: "en", label: "EN" },
        { value: "th", label: "TH" },
      ]}
    />
  );
};
