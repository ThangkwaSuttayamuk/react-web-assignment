"use client";

import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
} from "antd";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { useFormTableViewModel } from "../useFormTableViewModel";
import { CitizenIdInput } from "./CitizenIdInput";
import styles from "./UserForm.module.scss";

export const UserForm = () => {
  const { t } = useTranslation();
  const { form, handleChange, handleSubmit, reset, editingId, errors } =
    useFormTableViewModel();

  return (
    <Form layout="horizontal" labelAlign="left">
      <Row gutter={[16, 16]} align="middle">
        <Col xs={24} md={4}>
          <Form.Item
            label={t("formTable.form.title")}
            required
            validateStatus={errors.title ? "error" : undefined}
            help={errors.title}
          >
            <Select
              placeholder={t("formTable.form.selectTitle")}
              value={form.title}
              onChange={(value) => handleChange("title", value)}
              options={[
                { value: "Mr.", label: t("formTable.options.title.mr") },
                { value: "Mrs.", label: t("formTable.options.title.mrs") },
                { value: "Ms.", label: t("formTable.options.title.ms") },
              ]}
            />
          </Form.Item>
        </Col>

        <Col xs={24} md={10}>
          <Form.Item
            label={t("formTable.form.firstname")}
            required
            validateStatus={errors.firstname ? "error" : undefined}
            help={errors.firstname}
          >
            <Input
              value={form.firstname}
              onChange={(e) => handleChange("firstname", e.target.value)}
            />
          </Form.Item>
        </Col>

        <Col xs={24} md={10}>
          <Form.Item
            label={t("formTable.form.lastname")}
            required
            validateStatus={errors.lastname ? "error" : undefined}
            help={errors.lastname}
          >
            <Input
              value={form.lastname}
              onChange={(e) => handleChange("lastname", e.target.value)}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={6}>
          <Form.Item
            label={t("formTable.form.birthday")}
            required
            validateStatus={errors.birthday ? "error" : undefined}
            help={errors.birthday}
          >
            <DatePicker
              className={styles.fullWidth}
              placeholder={t("formTable.form.birthdayPlaceholder")}
              value={form.birthday ? dayjs(form.birthday) : undefined}
              onChange={(date) =>
                handleChange("birthday", date ? date.format("YYYY-MM-DD") : "")
              }
            />
          </Form.Item>
        </Col>

        <Col xs={24} md={10}>
          <Form.Item
            label={t("formTable.form.nationality")}
            required
            validateStatus={errors.nationality ? "error" : undefined}
            help={errors.nationality}
          >
            <Select
              placeholder={t("formTable.form.selectPlaceholder")}
              value={form.nationality}
              onChange={(value) => handleChange("nationality", value)}
              options={[
                {
                  value: "Thai",
                  label: t("formTable.options.nationality.thai"),
                },
                {
                  value: "American",
                  label: t("formTable.options.nationality.american"),
                },
                {
                  value: "British",
                  label: t("formTable.options.nationality.british"),
                },
                {
                  value: "Japanese",
                  label: t("formTable.options.nationality.japanese"),
                },
                {
                  value: "Australian",
                  label: t("formTable.options.nationality.australian"),
                },
              ]}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={24}>
          <Form.Item
            label={t("formTable.form.citizenId")}
            validateStatus={errors.citizenId ? "error" : undefined}
            help={errors.citizenId}
          >
            <CitizenIdInput
              value={form.citizenId}
              onChange={(value) => handleChange("citizenId", value)}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Form.Item
            label={t("formTable.form.gender")}
            required
            validateStatus={errors.gender ? "error" : undefined}
            help={errors.gender}
          >
            <Radio.Group
              value={form.gender}
              onChange={(e) => handleChange("gender", e.target.value)}
            >
              <Radio value="Male">{t("formTable.options.gender.male")}</Radio>
              <Radio value="Female">
                {t("formTable.options.gender.female")}
              </Radio>
              <Radio value="Unsex">{t("formTable.options.gender.unsex")}</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Form.Item
            label={t("formTable.form.mobilePhone")}
            required
            validateStatus={errors.countryCode ? "error" : undefined}
            help={errors.countryCode}
          >
            <Select
              value={form.countryCode}
              onChange={(value) => handleChange("countryCode", value)}
              options={[
                { value: "+1", label: t("formTable.options.countryCode.us") },
                { value: "+44", label: t("formTable.options.countryCode.gb") },
                { value: "+66", label: t("formTable.options.countryCode.th") },
                { value: "+81", label: t("formTable.options.countryCode.jp") },
                { value: "+61", label: t("formTable.options.countryCode.au") },
              ]}
            />
          </Form.Item>
        </Col>

        <Col
          xs={24}
          md={1}
          className={styles.phoneSeparator}
        >
          -
        </Col>

        <Col xs={24} md={8}>
          <Form.Item
            label=""
            required
            validateStatus={errors.phone ? "error" : undefined}
            help={errors.phone}
          >
            <Input
              inputMode="numeric"
              maxLength={10}
              value={form.phone ?? ""}
              onChange={(e) => {
                const digitsOnly = e.target.value.replace(/\D/g, "");
                const trimmed = digitsOnly.slice(0, 10);
                handleChange("phone", trimmed);
              }}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Form.Item
            label={t("formTable.form.passportNo")}
            validateStatus={errors.passportNo ? "error" : undefined}
            help={errors.passportNo}
          >
            <Input
              maxLength={9}
              value={form.passportNo}
              onChange={(e) => {
                const sanitized = e.target.value
                  .toUpperCase()
                  .replace(/[^A-Z0-9]/g, "")
                  .slice(0, 9);
                handleChange("passportNo", sanitized);
              }}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className={styles.rowSpaceBetween}>
        <Col xs={24} md={8}>
          <Form.Item
            label={t("formTable.form.expectedSalary")}
            required
            validateStatus={errors.expectedSalary ? "error" : undefined}
            help={errors.expectedSalary}
          >
            <InputNumber
              className={styles.fullWidth}
              value={
                typeof form.expectedSalary === "number"
                  ? form.expectedSalary
                  : undefined
              }
              onChange={(value) =>
                handleChange("expectedSalary", value ?? undefined)
              }
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Row gutter={[16, 8]}>
            <Col xs={24} md={8}>
              <Button onClick={reset}>{t("formTable.form.reset")}</Button>
            </Col>
            <Col xs={24} md={16}>
              <Button onClick={handleSubmit}>
                {editingId
                  ? t("formTable.form.update")
                  : t("formTable.form.submit")}
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Form>
  );
};
