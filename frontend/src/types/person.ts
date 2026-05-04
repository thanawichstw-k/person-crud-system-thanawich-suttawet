export interface Person {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: string;
  age: number;
  address: string;
  createdAt: string;
}

export interface CreatePersonRequest {
  firstName: string;
  lastName: string;
  birthDate: string;
  address: string;
}

export interface PersonFormValues {
  firstName: string;
  lastName: string;
  birthDate: string;
  address: string;
}

export type PersonFormErrors = Partial<Record<keyof PersonFormValues, string>>;
