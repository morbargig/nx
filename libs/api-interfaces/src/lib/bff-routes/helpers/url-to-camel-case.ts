type RemoveSlash<S extends string> = S extends `${infer Before}/${infer After}`
  ? `${RemoveSlash<Before>}${RemoveSlash<After>}`
  : S;

type RemoveSlashAndCapitalize<S extends string> =
  RemoveSlash<S> extends `${infer Before}-${infer After}`
    ? `${Before}${Capitalize<RemoveSlashAndCapitalize<After>>}`
    : RemoveSlash<S>;

export type UrlToCamelCase<T extends string | number | symbol> = {
  [K in T]: RemoveSlashAndCapitalize<Extract<K, string>>;
}[T];
