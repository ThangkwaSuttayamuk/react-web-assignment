import { Input } from "antd";
import React, { useRef } from "react";
import styles from "./CitizenIdInput.module.scss";

type Props = {
  value?: string; 
  onChange?: (value: string) => void;
};

const GROUPS = [1, 4, 5, 2, 1];
const TOTAL = 13;

export const CitizenIdInput: React.FC<Props> = ({ value = "", onChange }) => {
  const refs = useRef<Array<HTMLInputElement | null>>([]);

  const digits = value.padEnd(TOTAL, "_").slice(0, TOTAL).split("");

  const focusPosition = (globalIndex: number) => {
    if (globalIndex < 0) globalIndex = 0;
    if (globalIndex > TOTAL) globalIndex = TOTAL;

    let acc = 0;

    for (let g = 0; g < GROUPS.length; g++) {
      const len = GROUPS[g];

      if (globalIndex <= acc + len) {
        const localPos = globalIndex - acc;
        const input = refs.current[g];
        if (!input) return;

        input.focus();
        input.setSelectionRange(localPos, localPos);
        return;
      }

      acc += len;
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    groupIndex: number,
  ) => {
    const input = e.currentTarget;
    const selectionStart = input.selectionStart || 0;

    const groupStart = GROUPS.slice(0, groupIndex).reduce((a, b) => a + b, 0);

    const globalIndex = groupStart + selectionStart;

    if (/^\d$/.test(e.key)) {
      e.preventDefault();
      const currentDigits = value.replace(/\D/g, "");

      if (currentDigits.length >= TOTAL) {
        return;
      }

      const raw = value.padEnd(TOTAL, "_").split("");
      raw.splice(globalIndex, 0, e.key);
      raw.pop();

      const newValue = raw.join("").replace(/_/g, "");
      onChange?.(newValue);

      const groupLength = GROUPS[groupIndex];
      const isLastPositionInGroup = selectionStart === groupLength - 1;

      let nextIndex: number;

      if (isLastPositionInGroup) {
        nextIndex = GROUPS.slice(0, groupIndex + 1).reduce((a, b) => a + b, 0);
      } else {
        nextIndex = globalIndex + 1;
      }

      requestAnimationFrame(() => {
        focusPosition(nextIndex);
      });
    }

    if (e.key === "Backspace") {
      e.preventDefault();

      if (globalIndex === 0) return;

      const raw = value.padEnd(TOTAL, "_").split("");

      raw.splice(globalIndex - 1, 1);
      raw.push("_");

      const newValue = raw.join("").replace(/_/g, "");
      onChange?.(newValue);

      requestAnimationFrame(() => {
        focusPosition(globalIndex - 1);
      });
    }

    if (e.key === "Delete") {
      e.preventDefault();

      const raw = value.padEnd(TOTAL, "_").split("");

      raw.splice(globalIndex, 1);
      raw.push("_");

      const newValue = raw.join("").replace(/_/g, "");
      onChange?.(newValue);

      requestAnimationFrame(() => {
        focusPosition(globalIndex);
      });
    }

    if (e.key === "ArrowLeft") {
      e.preventDefault();
      focusPosition(globalIndex - 1);
    }

    if (e.key === "ArrowRight") {
      e.preventDefault();
      focusPosition(globalIndex + 1);
    }
  };

  let cursor = 0;

  return (
    <div className={styles.container}>
      {GROUPS.map((len, groupIndex) => {
        const groupValue = digits
          .slice(cursor, cursor + len)
          .join("")
          .replace(/_/g, "");

        cursor += len;

        return (
          <React.Fragment key={groupIndex}>
            <Input
              ref={(el) => {
                refs.current[groupIndex] = el?.input || null;
              }}
              value={groupValue}
              onKeyDown={(e) => handleKeyDown(e, groupIndex)}
              style={{
                "--group-width": `${len * 40}px`,
              } as React.CSSProperties}
              className={styles.groupInput}
            />
            {groupIndex < GROUPS.length - 1 && (
              <span className={styles.separator}>-</span>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
