import { Request } from 'express';
import { JwtPayload } from '../modules/auth/types';
export interface CustomRequest extends Request {
  user: JwtPayload;
}
