export declare type JsonPrimitive = string | number | boolean | null;
export declare type JsonValue =
  | JsonPrimitive
  | JsonArray
  | JsonObject
  | undefined;
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface JsonArray extends Array<JsonValue> {}
export interface JsonObject {
  [key: string]: JsonValue;
}
export type JsonType = JsonValue;