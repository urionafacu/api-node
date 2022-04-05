/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
export enum UserRolEnum {
  ADMIN = 'admin',
  USER = 'user',
}

export type UserModel = {
  id: number;
  name: string;
  age: number;
  email: string;
  password: string;
  role: UserRolEnum;
};
