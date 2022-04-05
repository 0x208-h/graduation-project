export const baseURL = "http://localhost:8080/api";

export interface DeleteResponse {
  status: number;
  statusText: string;
}
export interface UpdateResponse extends DeleteResponse {}

export interface AddResponse extends DeleteResponse {}