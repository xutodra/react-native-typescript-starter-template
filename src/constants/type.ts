import { ErrorType } from "./enum";

export type Error = {
  type: ErrorType,
  errorMessage?: string | null,
};