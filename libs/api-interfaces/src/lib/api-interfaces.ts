export declare type JsonPrimitive = string | number | boolean | null;
export declare type JsonValue =
  | JsonPrimitive
  | JsonArray
  | JsonObject
  | undefined;
export interface JsonArray extends Array<JsonValue> {}
export interface JsonObject {
  [key: string]: JsonValue;
}
export type JsonType = JsonValue;