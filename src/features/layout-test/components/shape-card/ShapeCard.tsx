"use client";
import { Card } from "antd";
import styles from "./ShapeCard.module.scss";

type ShapeCardProps = {
  shapeName: string;
  onClick?: () => void;
};

export const ShapeCard = ({ shapeName, onClick }: ShapeCardProps) => (
  <Card className={styles["shape-card"]} hoverable onClick={onClick}>
    <div className={`${styles.shape} ${styles[shapeName]}`} />
  </Card>
);
