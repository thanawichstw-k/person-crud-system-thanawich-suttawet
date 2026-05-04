import { Inbox, Plus } from "lucide-react";
import { Button } from "../ui/Button";
import styles from "../../styles/PeoplePage.module.css";

interface EmptyStateProps {
  onAddClick: () => void;
  isFiltering: boolean;
}

export function EmptyState({ onAddClick, isFiltering }: EmptyStateProps) {
  return (
    <div className={styles.emptyState}>
      <div className={styles.emptyIcon}><Inbox size={34} /></div>
      <h3>{isFiltering ? "No matching records" : "No people records yet"}</h3>
      <p>
        {isFiltering
          ? "Try adjusting your search keyword or clear the filter."
          : "Start by adding the first person into the database."}
      </p>
      {!isFiltering ? (
        <Button type="button" onClick={onAddClick}>
          <Plus size={18} /> Add first person
        </Button>
      ) : null}
    </div>
  );
}
