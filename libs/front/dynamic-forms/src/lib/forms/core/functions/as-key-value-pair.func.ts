import { KeyValuePair } from '../interfaces/key-value-pair';
export function asKeyValuePair(obj: object): KeyValuePair[] {
  if (obj) {
    const keys = Object.keys(obj);
    const isEnum = keys?.filter((x) => x == obj[obj[x]])?.length == keys.length;
    let selectedKeys: string[] = null;
    if (isEnum) {
      selectedKeys = keys.slice(keys.length / 2);
    } else {
      selectedKeys = keys;
    }
    return selectedKeys?.map((key) => {
      return {
        label: key,
        value: obj[key],
      } as KeyValuePair;
    });
  }
  return null;
}
