import { Plus, Search } from "lucide-react";
import { Button } from "../ui/Button";
import styles from "../../styles/PeoplePage.module.css";

interface PeopleToolbarProps {
  total: number;
  search: string;
  onSearchChange: (value: string) => void;
  onAddClick: () => void;
}

export function PeopleToolbar({ total, search, onSearchChange, onAddClick }: PeopleToolbarProps) {
  return (
    <div className={styles.toolbar}>
      <div>
        <h2>People Directory</h2>
        <span>{total} records available</span>
      </div>

      <div className={styles.toolbarActions}>
        <label className={styles.searchBox}>
          <Search size={18} />
          <input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search name, age, or address..."
          />
        </label>

        <Button type="button" onClick={onAddClick}>
          <Plus size={18} /> Add Person
        </Button>
      </div>
    </div>
  );
}
