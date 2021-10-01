export type Header = {
  'Content-Type'?: 'application/x-www-form-urlencoded' | 'application/json' | 'multipart/form-data',
  'Authorization'?: string
}

export type Options = {
  needAuthorizedToken?: boolean,
  ignoreLoading?: boolean,
  ignoreError?: boolean,
}
