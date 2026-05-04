import { Eye, UserRound } from "lucide-react";
import type { Person } from "../../types/person";
import { formatDate } from "../../utils/dateUtils";
import { Button } from "../ui/Button";
import styles from "../../styles/PeoplePage.module.css";

interface PeopleTableProps {
  people: Person[];
  onView: (person: Person) => void;
}

export function PeopleTable({ people, onView }: PeopleTableProps) {
  return (
    <div className={styles.tableWrap}>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Birth Date</th>
            <th>Age</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {people.map((person) => (
            <tr key={person.id}>
              <td>#{person.id}</td>
              <td>
                <div className={styles.nameCell}>
                  <UserRound size={17} />
                  {person.firstName} {person.lastName}
                </div>
              </td>
              <td>{formatDate(person.birthDate)}</td>
              <td><span className={styles.agePill}>{person.age} yrs</span></td>
              <td className={styles.addressCell}>{person.address}</td>
              <td>
                <Button type="button" variant="blue" onClick={() => onView(person)}>
                  <Eye size={16} /> View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
