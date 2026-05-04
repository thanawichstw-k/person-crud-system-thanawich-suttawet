import { CheckCircle2, X } from "lucide-react";
import { Button } from "./Button";
import styles from "../../styles/PeoplePage.module.css";

interface ToastProps {
  message: string;
  onClose: () => void;
}

export function Toast({ message, onClose }: ToastProps) {
  return (
    <div className={styles.toast} role="status">
      <CheckCircle2 size={20} />
      <span>{message}</span>
      <Button type="button" variant="ghost" className={styles.toastClose} onClick={onClose} aria-label="Close toast">
        <X size={16} />
      </Button>
    </div>
  );
}
