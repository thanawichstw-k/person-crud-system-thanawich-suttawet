import { AlertTriangle, RefreshCcw } from "lucide-react";
import { API_BASE_URL } from "../../api/axiosClient";
import { Button } from "../ui/Button";
import styles from "../../styles/PeoplePage.module.css";

interface ErrorStateProps {
  onRetry: () => void;
}

export function ErrorState({ onRetry }: ErrorStateProps) {
  return (
    <div className={styles.errorState}>
      <div className={styles.errorIcon}><AlertTriangle size={34} /></div>
      <h3>โหลดข้อมูลไม่สำเร็จ</h3>
      <p>กรุณาตรวจสอบว่า API รันอยู่ที่ <strong>{API_BASE_URL}</strong></p>
      <Button type="button" variant="danger" onClick={onRetry}>
        <RefreshCcw size={18} /> Try again
      </Button>
    </div>
  );
}
