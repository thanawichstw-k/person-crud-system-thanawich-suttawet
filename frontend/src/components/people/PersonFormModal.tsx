import { useMemo, useState } from "react";
import { Calendar, Home, Save, User } from "lucide-react";
import type { PersonFormErrors, PersonFormValues } from "../../types/person";
import { calculateAgePreview } from "../../utils/dateUtils";
import {
  hasFormErrors,
  isDirty,
  validatePersonForm,
} from "../../utils/validation";
import { Button } from "../ui/Button";
import { InputField } from "../ui/InputField";
import { Modal } from "../ui/Modal";
import styles from "../../styles/PeoplePage.module.css";
import DatePickerField from "../ui/DatePickerField";

interface PersonFormModalProps {
  isSaving: boolean;
  onClose: () => void;
  onSubmit: (values: PersonFormValues) => void;
}

const initialValues: PersonFormValues = {
  firstName: "",
  lastName: "",
  birthDate: "",
  address: "",
};

export function PersonFormModal({
  isSaving,
  onClose,
  onSubmit,
}: PersonFormModalProps) {
  const [values, setValues] = useState<PersonFormValues>(initialValues);
  const [errors, setErrors] = useState<PersonFormErrors>({});

  const agePreview = useMemo(
    () => calculateAgePreview(values.birthDate),
    [values.birthDate]
  );

  function updateField<K extends keyof PersonFormValues>(
    key: K,
    value: PersonFormValues[K]
  ) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function requestClose() {
    if (isDirty(values)) {
      const confirmed = window.confirm(
        "You have unsaved changes. Close this modal?"
      );
      if (!confirmed) return;
    }

    onClose();
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validatePersonForm(values);
    setErrors(nextErrors);

    if (hasFormErrors(nextErrors)) return;

    onSubmit({
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      birthDate: values.birthDate,
      address: values.address.trim(),
    });
  }

  return (
    <Modal
      title="Add New Person"
      onClose={requestClose}
      footer={
        <>
          <Button
            type="button"
            variant="secondary"
            onClick={requestClose}
            disabled={isSaving}
          >
            Cancel
          </Button>
          <Button type="submit" form="person-form" disabled={isSaving}>
            <Save size={17} /> {isSaving ? "Saving..." : "Save"}
          </Button>
        </>
      }
    >
      <form
        id="person-form"
        className={styles.personForm}
        onSubmit={handleSubmit}
        noValidate
      >
        <div className={styles.twoCols}>
          <InputField
            label="First Name"
            icon={<User size={14} />}
            value={values.firstName}
            onChange={(event) => updateField("firstName", event.target.value)}
            error={errors.firstName}
            placeholder="John"
            autoFocus
          />
          <InputField
            label="Last Name"
            icon={<User size={14} />}
            value={values.lastName}
            onChange={(event) => updateField("lastName", event.target.value)}
            error={errors.lastName}
            placeholder="Smith"
          />
        </div>

        <div className={styles.twoCols}>
          <DatePickerField
            label="Birth Date"
            value={values.birthDate}
            onChange={(dateValue) => updateField("birthDate", dateValue)}
            error={errors.birthDate}
          />
          <InputField
            label="Age Preview"
            value={values.birthDate ? `${agePreview} years` : "Auto calculated"}
            readOnly
          />
        </div>

        <InputField
          textarea
          rows={4}
          label="Address"
          icon={<Home size={14} />}
          value={values.address}
          onChange={(event) => updateField("address", event.target.value)}
          error={errors.address}
          placeholder="Enter full address"
        />

        <p className={styles.formNote}>
          Age preview is for UX only. The official age is calculated again by
          the .NET API from BirthDate.
        </p>
      </form>
    </Modal>
  );
}
