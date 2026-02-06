"use client";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { Col, Divider, Row, Typography } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./LayoutTestView.module.scss";
import { ControlCard } from "./components/control-card/ControlCard";
import controlStyles from "./components/control-card/ControlCard.module.scss";
import { ShapeCard } from "./components/shape-card/ShapeCard";
import { ShapeCol } from "./components/shape-col/ShapeCol";

type AlignType = "left" | "right";

export const LayoutTestView = () => {
  const { t } = useTranslation();
  const [align, setAlign] = useState<AlignType>("left");
  const [items, setItems] = useState([1, 2, 3, 4, 5, 6]);

  const shapeByNumber: Record<number, string> = {
    1: "square",
    2: "circle",
    3: "ovalHorizontal",
    4: "trapezoid",
    5: "rectangle",
    6: "parallelogram",
  };

  const rotateLeft = (list: number[]) => {
    if (list.length === 0) return list;
    return [...list.slice(1), list[0]];
  };

  const rotateRightOnRing = (list: number[]) => {
    if (list.length === 0) return list;
    const next = [...list];
    const ringIndices = [0, 1, 2, 5, 4, 3];
    ringIndices.forEach((index, position) => {
      const prevIndex =
        ringIndices[(position - 1 + ringIndices.length) % ringIndices.length];
      next[index] = list[prevIndex];
    });
    return next;
  };

  const moveLeft = () => {
    setItems((prev) => rotateLeft(prev));
  };

  const moveRight = () => {
    setItems((prev) => rotateRightOnRing(prev));
  };

  const toggleAlign = () => {
    setAlign((prev) => (prev === "left" ? "right" : "left"));
  };

  const shuffleItems = () => {
    setItems((prev) => {
      const next = [...prev];
      for (let i = next.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [next[i], next[j]] = [next[j], next[i]];
      }
      return next;
    });
  };

  const renderShapeCard = (value: number) => (
    <ShapeCard shapeName={shapeByNumber[value]} onClick={shuffleItems} />
  );

  return (
    <div className={`gradient-container ${styles.container}`}>
      <Row
        align="middle"
        justify="space-between"
        className={styles.headerRow}
      >
        <Col>
          <Typography.Title level={2} >
            <span suppressHydrationWarning>{t("layoutTest.title")}</span>
          </Typography.Title>
        </Col>
        <Col>
          <div className={styles.languageSwitcher}>
            <LanguageSwitcher />
          </div>
        </Col>
      </Row>
      
      <div className={styles.groupPadding}>
        <Row justify="center" gutter={16} className={styles.controlRow}>
          <Col>
            <ControlCard
              label={t("layoutTest.controls.moveShape")}
              onClick={moveLeft}
              ariaLabel={t("layoutTest.controls.moveLeft")}
              content={
                  <span className={`${controlStyles.triangle} ${controlStyles["triangle-left"]}`} />
                }
            />
          </Col>
          <Col>
            <ControlCard
              label={t("layoutTest.controls.align")}
              onClick={toggleAlign}
              ariaLabel={t("layoutTest.controls.align")}
              wide
              content={
                  <span className={controlStyles["triangle-stack"]}>
                    <span className={`${controlStyles.triangle} ${controlStyles["triangle-up"]}`} />
                    <span className={`${controlStyles.triangle} ${controlStyles["triangle-down"]}`} />
                  </span>
              }
            />
          </Col>
          <Col>
            <ControlCard
              label={t("layoutTest.controls.moveShape")}
              onClick={moveRight}
              ariaLabel={t("layoutTest.controls.moveRight")}
              content={
                  <span className={`${controlStyles.triangle} ${controlStyles["triangle-right"]}`} />
              }
            />
          </Col>
        </Row>

        <Divider className={styles["control-divider"]} />

        <Row
          justify={align === "left" ? "start" : "end"}
          gutter={16}
          className={styles.shapeRow}
        >
          <ShapeCol>{renderShapeCard(items[0])}</ShapeCol>
          <ShapeCol>{renderShapeCard(items[1])}</ShapeCol>
          <ShapeCol>{renderShapeCard(items[2])}</ShapeCol>
        </Row>
        <Row
          justify={align === "left" ? "end" : "start"}
          gutter={16}
          className={styles.shapeRow}
        >
          <ShapeCol>{renderShapeCard(items[3])}</ShapeCol>
          <ShapeCol>{renderShapeCard(items[4])}</ShapeCol>
          <ShapeCol>{renderShapeCard(items[5])}</ShapeCol>
        </Row>
      </div>
    </div>
  );
};
