"use client";
import { Card } from "antd";
import type { ReactNode } from "react";
import styles from "./ControlCard.module.scss";

type ControlCardProps = {
  label: string;
  onClick: () => void;
  content: ReactNode;
  wide?: boolean;
  ariaLabel: string;
};

export const ControlCard = ({
  label,
  onClick,
  content,
  wide,
  ariaLabel,
}: ControlCardProps) => (
  <Card className={styles["control-card"]}>
    <div
      className={`${styles["control-card-content"]} ${
        wide ? styles["control-card-content-wide"] : ""
      }`}
    >
      <button
        type="button"
        className={styles["triangle-control"]}
        onClick={onClick}
        aria-label={ariaLabel}
        suppressHydrationWarning
      >
        {content}
      </button>
      <span
        className={styles["control-label"]}
        suppressHydrationWarning
      >
        {label}
      </span>
    </div>
  </Card>
);
