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

export interface User {
  job: {
    title: string;
    salary: number;
    coworkers: { name: string; phoneNumber: number }[];
  };
  matrix: string[][];
  roles: string[];
  test: { t: { b: string } };
  name: string;
  age: number;
  friends: {
    name: string;
    phoneNumber: number;
    bestFriend: { name: string; phoneNumber: number };
    friends: {
      name: string;
      phoneNumber: number;
      friends: { name: string; phoneNumber: number }[];
    }[];
  }[];
  // description: string;
  // payment: [{ obj: [{ obj2: [{ obj3: number[][] }] }] }];
}

// export interface Test {

// }
