"use client";

import { Button, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useTranslation } from "react-i18next";
import styles from "../FormTable.module.scss";
import { User } from "../formTable.slice";
import { useFormTableViewModel } from "../useFormTableViewModel";

interface UserTableProps {
  users: User[];
  pageRowKeys: string[];
  selectedRowKeys: string[];
  onSelectionChange: (keys: string[]) => void;
}

export const UserTable = ({
  users,
  pageRowKeys,
  selectedRowKeys,
  onSelectionChange,
}: UserTableProps) => {
  const { t } = useTranslation();
  const { edit, delete: deleteUser } = useFormTableViewModel();
  const selectedRowKeysInPage = selectedRowKeys.filter(id =>
    pageRowKeys.includes(id)
  );

  const columns: ColumnsType<User> = [
    {
      title: t("formTable.table.name"),
      render: (_, record) =>
        `${record.title || ""} ${record.firstname || ""} ${
          record.lastname || ""
        }`.trim(),
      sorter: (a, b) => {
        const nameA = `${a.title || ""} ${a.firstname || ""} ${
          a.lastname || ""
        }`.trim();
        const nameB = `${b.title || ""} ${b.firstname || ""} ${
          b.lastname || ""
        }`.trim();
        return nameA.localeCompare(nameB);
      },
      sortDirections: ["ascend", "descend"],
    },
    {
      title: t("formTable.table.gender"),
      dataIndex: "gender",
      sorter: (a, b) => (a.gender || "").localeCompare(b.gender || ""),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: t("formTable.table.mobilePhone"),
      render: (_, record) =>
        `${record.countryCode || ""} ${record.phone ?? ""}`.trim(),
      sorter: (a, b) => {
        const phoneA = `${a.countryCode || ""}${a.phone || ""}`;
        const phoneB = `${b.countryCode || ""}${b.phone || ""}`;
        return phoneA.localeCompare(phoneB);
      },
      sortDirections: ["ascend", "descend"],
    },
    {
      title: t("formTable.table.nationality"),
      dataIndex: "nationality",
      sorter: (a, b) =>
        (a.nationality || "").localeCompare(b.nationality || ""),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: t("formTable.table.manage"),
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            className={styles.manageActionButton}
            onClick={() => edit(record.id)}
          >
            {t("formTable.table.edit")}
          </Button>
          <Button
            type="text"
            className={styles.manageActionButton}
            onClick={() => deleteUser(record.id)}
          >
            {t("formTable.table.delete")}
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Table<User>
      rowKey="id"
      columns={columns}
      dataSource={users}
      rowSelection={{
        selectedRowKeys: selectedRowKeysInPage,
        onChange: (keys) => {
          const keep = selectedRowKeys.filter(
            id => !pageRowKeys.includes(id)
          );
          onSelectionChange([...(keep as string[]), ...(keys as string[])]);
        },
      }}
      pagination={false}
      scroll={{ x: true }}
    />
  );
};
