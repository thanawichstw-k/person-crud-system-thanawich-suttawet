import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar } from "lucide-react";
import styles from "./DatePickerField.module.css";

interface DatePickerFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export default function DatePickerField({
  label,
  value,
  onChange,
  error,
}: DatePickerFieldProps) {
  const selectedDate = value ? new Date(`${value}T00:00:00`) : null;

  function handleChange(date: Date | null) {
    if (!date) {
      onChange("");
      return;
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    onChange(`${year}-${month}-${day}`);
  }

  return (
    <div className={styles.field}>
      <label className={styles.label}>
        <Calendar size={14} />
        {label}
      </label>

      <DatePicker
        selected={selectedDate}
        onChange={handleChange}
        dateFormat="dd/MM/yyyy"
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        placeholderText="Select birth date"
        maxDate={new Date()}
        wrapperClassName={styles.datePickerWrapper}
        className={styles.input}
        calendarClassName={styles.calendar}
      />

      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}