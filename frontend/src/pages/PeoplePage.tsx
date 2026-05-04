import { useEffect, useMemo, useState } from "react";
import { AppShell } from "../components/layout/AppShell";
import { EmptyState } from "../components/people/EmptyState";
import { ErrorState } from "../components/people/ErrorState";
import { LoadingSkeleton } from "../components/people/LoadingSkeleton";
import { Pagination } from "../components/people/Pagination";
import { PeopleTable } from "../components/people/PeopleTable";
import { PeopleToolbar } from "../components/people/PeopleToolbar";
import { PersonFormModal } from "../components/people/PersonFormModal";
import { PersonViewModal } from "../components/people/PersonViewModal";
import { Toast } from "../components/ui/Toast";
import { useCreatePerson, usePeople } from "../hooks/usePeople";
import type { Person, PersonFormValues } from "../types/person";
import styles from "../styles/PeoplePage.module.css";

export function PeoplePage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [viewPerson, setViewPerson] = useState<Person | null>(null);
  const [toast, setToast] = useState("");

  const peopleQuery = usePeople();
  const createPerson = useCreatePerson();

  const filteredPeople = useMemo(() => {
    const people = peopleQuery.data ?? [];
    const keyword = search.trim().toLowerCase();

    if (!keyword) return people;

    return people.filter((person) => {
      const text = `${person.firstName} ${person.lastName} ${person.age} ${person.address}`.toLowerCase();
      return text.includes(keyword);
    });
  }, [peopleQuery.data, search]);

  const totalPages = Math.max(1, Math.ceil(filteredPeople.length / pageSize));

  const pagedPeople = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredPeople.slice(start, start + pageSize);
  }, [filteredPeople, page, pageSize]);

  useEffect(() => {
    setPage(1);
  }, [search, pageSize]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 2600);
    return () => window.clearTimeout(timer);
  }, [toast]);

  function handleCreate(values: PersonFormValues) {
    createPerson.mutate(values, {
      onSuccess: (created) => {
        setIsAddOpen(false);
        setToast(`${created.firstName} ${created.lastName} has been added successfully.`);
      },
    });
  }

  return (
    <AppShell>
      {toast ? <Toast message={toast} onClose={() => setToast("")} /> : null}

      <section className={styles.panel}>
        <PeopleToolbar
          total={peopleQuery.data?.length ?? 0}
          search={search}
          onSearchChange={setSearch}
          onAddClick={() => setIsAddOpen(true)}
        />

        {peopleQuery.isLoading ? <LoadingSkeleton /> : null}

        {peopleQuery.isError ? <ErrorState onRetry={() => peopleQuery.refetch()} /> : null}

        {peopleQuery.isSuccess && filteredPeople.length === 0 ? (
          <EmptyState onAddClick={() => setIsAddOpen(true)} isFiltering={Boolean(search.trim())} />
        ) : null}

        {peopleQuery.isSuccess && filteredPeople.length > 0 ? (
          <>
            <PeopleTable people={pagedPeople} onView={setViewPerson} />
            <Pagination
              page={page}
              pageSize={pageSize}
              total={filteredPeople.length}
              onPageChange={setPage}
              onPageSizeChange={setPageSize}
            />
          </>
        ) : null}
      </section>

      {isAddOpen ? (
        <PersonFormModal
          isSaving={createPerson.isPending}
          onClose={() => setIsAddOpen(false)}
          onSubmit={handleCreate}
        />
      ) : null}

      {viewPerson ? <PersonViewModal person={viewPerson} onClose={() => setViewPerson(null)} /> : null}
    </AppShell>
  );
}
