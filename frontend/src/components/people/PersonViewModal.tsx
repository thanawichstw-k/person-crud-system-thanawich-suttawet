import { Calendar, Home, User } from "lucide-react";
import type { Person } from "../../types/person";
import { formatDate } from "../../utils/dateUtils";
import { Button } from "../ui/Button";
import { InputField } from "../ui/InputField";
import { Modal } from "../ui/Modal";
import styles from "../../styles/PeoplePage.module.css";

interface PersonViewModalProps {
  person: Person;
  onClose: () => void;
}

export function PersonViewModal({ person, onClose }: PersonViewModalProps) {
  return (
    <Modal
      title="View Person Details"
      onClose={onClose}
      isReadOnly
      footer={<Button type="button" variant="danger" onClick={onClose}>Close</Button>}
    >
      <div className={`${styles.personForm} ${styles.readOnly}`}>
        <div className={styles.twoCols}>
          <InputField label="First Name" icon={<User size={14} />} value={person.firstName} readOnly />
          <InputField label="Last Name" icon={<User size={14} />} value={person.lastName} readOnly />
        </div>

        <div className={styles.twoCols}>
          <InputField label="Birth Date" icon={<Calendar size={14} />} value={formatDate(person.birthDate)} readOnly />
          <InputField label="Age" value={`${person.age} years`} readOnly />
        </div>

        <InputField textarea label="Address" icon={<Home size={14} />} value={person.address} rows={4} readOnly />
      </div>
    </Modal>
  );
}
