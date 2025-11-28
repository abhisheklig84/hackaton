"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./nestedDrawer.module.scss";
import PlusIcon from "@/assets/PlusIcon";
import NavigationImage from "@/assets/NavigationImage";
import { MenuItem } from "@/types/NestedDrawer";

type Props = {
  open: boolean;
  onClose: () => void;
  menu: MenuItem[];
  stack: MenuItem[][];
  setStack: React.Dispatch<React.SetStateAction<MenuItem[][]>>;
};

export default function NestedDrawer({
  open,
  onClose,
  menu,
  stack,
  setStack,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const modalRoot = typeof window !== "undefined" ? document.body : null;
  const currentPanel = stack[stack.length - 1];

  const [direction, setDirection] = useState<"forward" | "back">("forward");

  useEffect(() => {
    if (open) focusFirstItem();
  }, [open, menu]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handleBack();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, stack]);

  const focusFirstItem = () => {
    requestAnimationFrame(() => {
      const el = containerRef.current?.querySelector(
        "[data-menu-item]"
      ) as HTMLElement;
      el?.focus();
    });
  };

  const handleItemClick = (item: MenuItem) => {
    if (item.children && item.children.length > 0) {
      setDirection("forward");
      setStack((prev) => [...prev, item.children!]);
    } else if (item.href) {
      window.location.href = item.href;
      onClose();
    }
  };

  const handleBack = () => {
    if (stack.length <= 1) return;
    setDirection("back");
    setStack((prev) => prev.slice(0, -1));
  };

  if (!modalRoot) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className={styles.backdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            className={styles.drawer}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.y > 120 || info.velocity.y > 500) onClose();
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* HEADER */}
            <div className={styles.header}>
              <div className={styles.handle} />
              <div className={styles.title}>
                <button
                  onClick={handleBack}
                  className={`${
                    stack.length > 1 ? styles.backBtn : styles.hideBackButton
                  }`}
                  aria-label="Back"
                >
                  <NavigationImage fill="#555" /> Back
                </button>
                <div
                  onClick={onClose}
                  aria-label="Close"
                  className={styles.closeIcon}
                >
                  <PlusIcon fill="#888" />
                </div>
              </div>
            </div>

            {/* CONTENT */}
            <div className={styles.content} ref={containerRef}>
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={stack.length}
                  className={styles.panel}
                  custom={direction}
                  initial={{
                    x:
                      direction === "forward" || stack.length === 1
                        ? 300
                        : -300,
                    opacity: 0,
                  }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{
                    x: direction === "forward" ? -300 : 300,
                    opacity: 0,
                  }}
                  transition={{ duration: 0.25 }}
                >
                  <ul className={styles.list}>
                    {currentPanel.map((item) => (
                      <li key={item.id}>
                        <div
                          tabIndex={0}
                          role="button"
                          data-menu-item
                          className={styles.item}
                          onClick={() => handleItemClick(item)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ")
                              handleItemClick(item);
                          }}
                          aria-haspopup={item.children ? "true" : undefined}
                          aria-expanded={item.children ? "false" : undefined}
                        >
                          <div className={styles.topSection}>
                            {item.icon && (
                              <span className={styles.icon}>{item.icon}</span>
                            )}
                            <span className={styles.label}>{item.label}</span>
                            {item.children && (
                              <span className={styles.arrow}>
                                <NavigationImage
                                  height="16"
                                  width="16"
                                  fill="#888"
                                />
                              </span>
                            )}
                          </div>

                          {item.desc && (
                            <div className={styles.bottomSection}>
                              {item.desc}
                            </div>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    modalRoot
  );
}
