export * from "./auth";

export interface IRequestResponse<T> {
  status: "success" | "error";
  data: T | null;
}
