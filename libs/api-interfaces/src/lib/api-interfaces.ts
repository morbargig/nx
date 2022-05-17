export interface User {
  roles: string[];
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
