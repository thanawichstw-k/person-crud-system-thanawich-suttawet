import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { peopleApi } from "../api/peopleApi";
import type { CreatePersonRequest } from "../types/person";

export const peopleKeys = {
  all: ["people"] as const,
  detail: (id: number) => ["people", id] as const,
};

export function usePeople() {
  return useQuery({
    queryKey: peopleKeys.all,
    queryFn: peopleApi.getAll,
  });
}

export function usePerson(id?: number) {
  return useQuery({
    queryKey: id ? peopleKeys.detail(id) : ["people", "empty"],
    queryFn: () => peopleApi.getById(id!),
    enabled: Boolean(id),
  });
}

export function useCreatePerson() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreatePersonRequest) => peopleApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: peopleKeys.all });
    },
  });
}
