export interface User {
  name: string;
  age: number;
  friends: {
    name: string;
    phoneNumber: number;
    friends: { name: string; phoneNumber: number }[];
  }[];
  description: string;
  payment: [{ obj: [{ obj2: [{ obj3: number[][] }] }] }];
}
