import { Error } from "constants/type";

export type AppState = {
  isLoading: Array<string>,
  languageCode: string,
  error: Error | null,
  isUpdateProfile: boolean,
}