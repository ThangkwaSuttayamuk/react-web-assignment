"use client";
import { Col } from "antd";
import type { ReactNode } from "react";
import styles from "./ShapeCol.module.scss";

type ShapeColProps = {
  children: ReactNode;
};

export const ShapeCol = ({ children }: ShapeColProps) => (
  <Col
    md={5}
    className={styles["shape-col"]}
  >
    {children}
  </Col>
);
