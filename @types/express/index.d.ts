/* eslint-disable no-unused-vars */
import { UsersModel } from 'models';

declare global {
  namespace Express {
    interface Request {
      currentUser: UsersModel;
    }
  }
}
