import type { PersonFormErrors, PersonFormValues } from "../types/person";

export function validatePersonForm(values: PersonFormValues): PersonFormErrors {
  const errors: PersonFormErrors = {};
  const today = new Date();
  const birth = values.birthDate ? new Date(`${values.birthDate}T00:00:00`) : null;

  if (!values.firstName.trim()) errors.firstName = "Please enter first name.";
  if (!values.lastName.trim()) errors.lastName = "Please enter last name.";
  if (!values.birthDate) errors.birthDate = "Please select birth date.";
  if (birth && birth > today) errors.birthDate = "Birth date cannot be in the future.";
  if (!values.address.trim()) errors.address = "Please enter address.";
  if (values.address.trim().length < 5) errors.address = "Address should be at least 5 characters.";

  return errors;
}

export function hasFormErrors(errors: PersonFormErrors): boolean {
  return Object.values(errors).some(Boolean);
}

export function isDirty(values: PersonFormValues): boolean {
  return Object.values(values).some((value) => value.trim().length > 0);
}
