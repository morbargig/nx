export type tableElStyleObj = {
  styleClass?: string;
  style?: { [k: string]: string };
  styleClassObj?: { [k: string]: boolean };
};
type tableElementsStyleObj<T extends string = ''> = {
  [key in T]?: tableElStyleObj;
};
export type tableElements = 'table' | 'thead' | 'tr' | 'th' | 'td' | 'tbody';

export type tableBodyStylesObj = tableElementsStyleObj<tableElements>;