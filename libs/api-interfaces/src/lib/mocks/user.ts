export interface User {
  job: {
    title: string;
    salary: number;
    coworkers: { name: string; phoneNumber: number }[];
  };
  isHappy: boolean;
  matrix: string[][];
  roles: string[];
  name: string;
  age: number;
  friends?: {
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
