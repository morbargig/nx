import { BaseFieldData } from '../../core/interfaces/field-config';
import { KeyValuePair } from '../../core/interfaces/key-value-pair';
import { Observable } from 'rxjs';

// export type FormSelectData<
//   T = any,
//   K extends keyof T = keyof T
// > = BaseFieldData<T, K>

export interface FormSelectData<T = any, K extends keyof T = keyof T>
  extends BaseFieldData<T, K> {
  options: Observable<Omit<KeyValuePair, 'img' | 'disabled'>[]>;
}
