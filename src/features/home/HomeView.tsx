"use client";

import { TestCard } from "@/components/common/TestCard";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { Col, Row } from "antd";
import styles from "./HomeView.module.scss";
import { useHomeViewModel } from "./useHomeViewModel";

export const HomeView = () => {
  const { cards } = useHomeViewModel();

  return (
    <div className={`gradient-container ${styles.container}`}>
      <div className={styles.languageSwitcher}>
        <LanguageSwitcher />
      </div>

      <Row className={styles.cardsRow} gutter={[24, 24]} justify="center">
        {cards.map((card, index) => (
          <Col xs={24} sm={12} md={10} key={index} className={styles.cardCol}>
            <TestCard
              title={card.title}
              description={card.description}
              onClick={card.onClick}
            />
          </Col>
        ))}
      </Row>

    </div>
  );
};
