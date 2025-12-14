export type AuthRegistrationResponse = null;
export type AuthLoginResponse = null;

export interface IRequestResponse<T> {
  status: "success" | "error";
  data: T | null;
}
