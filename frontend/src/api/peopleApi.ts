import { axiosClient } from "./axiosClient";
import type { CreatePersonRequest, Person } from "../types/person";
import type { ApiResponse } from "../types/api";

export const peopleApi = {
  async getAll(): Promise<Person[]> {
    const response = await axiosClient.get<
      ApiResponse<Person[]>
    >("/people");
  
    return response.data.data;
  },

  async getById(id: number): Promise<Person> {
    const response = await axiosClient.get<
      ApiResponse<Person>
    >(`/people/${id}`);

    return response.data.data;
  },

  async create(payload: CreatePersonRequest): Promise<Person> {
    const response = await axiosClient.post<
      ApiResponse<Person>
    >("/people", payload);

    return response.data.data;
  },
};
