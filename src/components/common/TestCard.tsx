import { Card } from "antd";
import styles from "./TestCard.module.scss";

interface Props {
  title: string;
  description: string;
  onClick: () => void;
}

export const TestCard = ({ title, description, onClick }: Props) => {
  return (
    <Card hoverable className={styles.card} onClick={onClick}>
      <h3>{title}</h3>
      <p>{description}</p>
    </Card>
  );
};
