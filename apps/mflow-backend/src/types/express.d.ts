import { Request } from 'express';
import { JwtPayload } from '../modules/auth/types';
export interface CustomRequest extends Request {
  user: JwtPayload;
  cookies: {
    id?: string | null;
    accessToken?: string | null;
    refreshToken?: string | null;
  };
}
