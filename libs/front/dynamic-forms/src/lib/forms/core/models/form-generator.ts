export type ModelConverter<T = any, O = any> = (
  values: any[],
  objInEdit?: any,
  options?: any
) => O;

export interface IFormGenerator<T = any, O = any> {
  convert?: ModelConverter<any, O>;

  generate(...params: any[]): T;
}
