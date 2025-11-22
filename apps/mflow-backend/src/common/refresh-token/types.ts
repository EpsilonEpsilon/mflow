import { JwtPayload } from '../../modules/auth/types';

export interface RefreshTokenPayload extends JwtPayload {
  ip: string;
  userAgent: string;
}
