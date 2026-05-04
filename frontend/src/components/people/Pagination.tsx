import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/Button";
import styles from "../../styles/PeoplePage.module.css";

interface PaginationProps {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

export function Pagination({ page, pageSize, total, onPageChange, onPageSizeChange }: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const start = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  return (
    <div className={styles.paginationBar}>
      <span>Showing {start}-{end} of {total}</span>

      <div className={styles.paginationControls}>
        <select value={pageSize} onChange={(event) => onPageSizeChange(Number(event.target.value))}>
          <option value={5}>5 rows</option>
          <option value={10}>10 rows</option>
          <option value={15}>15 rows</option>
        </select>

        <Button type="button" variant="secondary" onClick={() => onPageChange(page - 1)} disabled={page <= 1}>
          <ChevronLeft size={16} /> Prev
        </Button>

        <strong>{page} / {totalPages}</strong>

        <Button type="button" variant="secondary" onClick={() => onPageChange(page + 1)} disabled={page >= totalPages}>
          Next <ChevronRight size={16} />
        </Button>
      </div>
    </div>
  );
}
