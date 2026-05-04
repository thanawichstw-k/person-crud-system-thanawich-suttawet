import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";
import styles from "../../styles/PeoplePage.module.css";

interface BaseProps {
  label: string;
  error?: string;
  icon?: ReactNode;
}

interface InputFieldProps extends BaseProps, InputHTMLAttributes<HTMLInputElement> {
  textarea?: false;
}

interface TextareaFieldProps extends BaseProps, TextareaHTMLAttributes<HTMLTextAreaElement> {
  textarea: true;
}

export function InputField(props: InputFieldProps | TextareaFieldProps) {
  const { label, error, icon, textarea, ...fieldProps } = props;

  return (
    <label className={styles.field}>
      <span>
        {icon}
        {label}
      </span>

      {textarea ? (
        <textarea {...(fieldProps as TextareaHTMLAttributes<HTMLTextAreaElement>)} />
      ) : (
        <input {...(fieldProps as InputHTMLAttributes<HTMLInputElement>)} />
      )}

      {error ? <small className={styles.fieldError}>{error}</small> : null}
    </label>
  );
}
