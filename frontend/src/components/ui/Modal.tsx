import type { ReactNode } from "react";
import { X } from "lucide-react";
import { Button } from "./Button";
import styles from "../../styles/PeoplePage.module.css";

interface ModalProps {
  title: string;
  children: ReactNode;
  onClose: () => void;
  footer?: ReactNode;
  isReadOnly?: boolean;
}

export function Modal({ title, children, onClose, footer, isReadOnly = false }: ModalProps) {
  return (
    <div className={styles.modalBackdrop} role="presentation" onMouseDown={onClose}>
      <section
        className={`${styles.modalCard} ${isReadOnly ? styles.viewModalCard : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <Button type="button" variant="ghost" className={styles.xBtn} onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </Button>

        <h3>{title}</h3>
        {children}
        {footer ? <div className={styles.modalActions}>{footer}</div> : null}
      </section>
    </div>
  );
}
