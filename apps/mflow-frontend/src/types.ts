import { FormControl } from '@angular/forms';

export type NgFormControl<T> = {
  [K in keyof T]: FormControl<T[K] | null>;
};
