export type languagesList = 'en' | 'he' | 'none';

export function GenericClass<Props>(): new () => Props {
  return class {} as any;
}
function concatIfExistsPath(path: string, suffix: string): string {
  return path ? `${path}.${suffix}` : suffix;
}
export function transformObjectToPath<T extends object | string>(
  suffix: string,
  objectToTransformOrEndOfPath: T,
  path = ''
): T {
  return typeof objectToTransformOrEndOfPath === 'object'
    ? Object.entries(objectToTransformOrEndOfPath).reduce(
        (objectToTransform, [key, value]) => {
          objectToTransform[key] = transformObjectToPath(
            key,
            value,
            concatIfExistsPath(path, suffix)
          );
          return objectToTransform;
        },
        {} as T
      )
    : (concatIfExistsPath(path, suffix) as T);
}

export type KeyChain<T, K extends keyof T = keyof T> = K extends string
  ? T[K] extends object
    ? `${K}.${KeyChain<T[K]>}`
    : K
  : never;

type privateTranslateDictionary<T extends string> =
  T extends `${infer W1}.${infer W2}`
    ? {
        [key in W1]: privateTranslateDictionary<W2> | string;
      }
    : {
        [key in T]: privateTranslateDictionary<string> | string;
      };

// type Disallowed = 'APP';
// type Allowed<T> = T & (T extends Disallowed ? never : T);

/** translateDictionary generic type must start with 'APPS' | 'LIBS' . and that the name of the app and after the name of the module etc */
export type translateDictionary<
  T extends {
    appOrLib: 'LIBS' | 'APPS';
    appOrLibVal: string;
    module?: string;
  }
> = {
  [key in T['module'] extends string
    ? `${T['appOrLib']}_${T['appOrLibVal']}_${T['module']}`
    : `${T['appOrLib']}_${T['appOrLibVal']}_${'APP'}`]:
    | privateTranslateDictionary<string>
    | string;
};

// get const and return it type with string value instead of const string values
export type removeConstStringValues<T> = T extends string
  ? string
  : {
      [K in keyof T]: removeConstStringValues<T[K]>; // Recurse over object properties
    };

/**
 * @Injectable()
 * export class TranslationsService extends GenericClass<typeof he>() {
 *  constructor() {
 *   super();
 *   Object.assign(this, transformObjectToPath('', he));
 *  }
 * }
 */
