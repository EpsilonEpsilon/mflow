import { JwtPayload } from '../../modules/auth/types';

export interface RefreshTokenPayload extends JwtPayload {
  ip: string;
  userAgent: string;
}

export type AccessTokenPayload = JwtPayload;

export interface TokenObject {
  token: string;
  expiresIn: Date;
}
