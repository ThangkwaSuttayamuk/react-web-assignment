"use client";

import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { Button, Checkbox, Col, Pagination, Row, Typography } from "antd";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { UserForm } from "./components/UserForm";
import { UserTable } from "./components/UserTable";
import styles from "./FormTable.module.scss";
import { useFormTableViewModel } from "./useFormTableViewModel";

const FormTableView = () => {
  const { t } = useTranslation();
  const { users, deleteMany } = useFormTableViewModel();
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const allRowKeys = useMemo(
    () => users.map(user => user.id),
    [users]
  );
  const isAllSelected =
    allRowKeys.length > 0 && selectedRowKeys.length === allRowKeys.length;

  const handleToggleSelectAll = (checked: boolean) => {
    setSelectedRowKeys(checked ? allRowKeys : []);
  };

  const handleDeleteSelected = () => {
    if (selectedRowKeys.length === 0) return;
    deleteMany(selectedRowKeys);
    setSelectedRowKeys([]);
  };

  const pagedUsers = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return users.slice(start, start + pageSize);
  }, [users, currentPage]);

  const pageRowKeys = useMemo(
    () => pagedUsers.map(user => user.id),
    [pagedUsers]
  );

  return (
    <div className={`gradient-container ${styles.container}`}>
      <div className={styles.topRightActions}>
        <LanguageSwitcher />
        <Link href="/">
          <Button>{t("formTable.actions.home")}</Button>
        </Link>
      </div>
      <Typography.Title level={2}>
        {t("formTable.title")}
      </Typography.Title>

      <Row justify="center">
        <Col xs={24} lg={18}>
          <div className={styles.formWrapper}>
            <UserForm />
          </div>
        </Col>
      </Row>

      <div className={styles.tableSection}>
        <div className={styles.tableHeader}>
          <div className={styles.tableActions}>
          <Checkbox
            checked={isAllSelected}
            onChange={(e) => handleToggleSelectAll(e.target.checked)}
          >
            {t("formTable.actions.selectAll")}
          </Checkbox>
          <Button
            onClick={handleDeleteSelected}
          >
            {t("formTable.actions.delete")}
          </Button>
          </div>
          <Pagination
            className={styles.pagination}
            current={currentPage}
            pageSize={pageSize}
            total={users.length}
            onChange={(page) => setCurrentPage(page)}
            itemRender={(page, type, element) => {
              if (type === "prev") {
                return <span>{t("formTable.table.prev")}</span>;
              }
              if (type === "next") {
                return <span>{t("formTable.table.next")}</span>;
              }
              return element;
            }}
          />
        </div>

        <UserTable
          users={pagedUsers}
          pageRowKeys={pageRowKeys}
          selectedRowKeys={selectedRowKeys}
          onSelectionChange={setSelectedRowKeys}
        />
      </div>
    </div>
  );
};

export default FormTableView;
