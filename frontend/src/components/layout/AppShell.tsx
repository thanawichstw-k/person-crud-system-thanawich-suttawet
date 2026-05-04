import type { ReactNode } from "react";
import { Sparkles } from "lucide-react";
import styles from "../../styles/PeoplePage.module.css";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <main className={styles.appShell}>
      <section className={styles.heroCard}>
        <div className={styles.heroPattern} />
        <span className={styles.heroBadge}>
          <Sparkles size={16} /> People Registry System
        </span>
        <h1>Personal Data Management</h1>
        
      </section>

      {children}
    </main>
  );
}
