export type StrictClass<TInterface> = {
  [K in keyof TInterface]: TInterface[K];
} & {
  // prevent extra keys
  [K: string]: never;
};
