export function asConst<Constraint extends Record<PropertyKey, unknown>>(): <T extends Constraint>(obj: T) => T {
  return obj => obj;
}
