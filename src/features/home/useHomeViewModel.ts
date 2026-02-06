import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";

export const useHomeViewModel = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const cards = [
    {
      title: t("test1"),
      description: t("layout"),
      onClick: () => {
        router.push("/layout-test");
      },
    },
    {
      title: t("test2"),
      description: t("form"),
      onClick: () => {
        
        router.push("/form-table");
      },
    },
  ];

  return {
    cards,
  };
};
