import { RefreshTokenObject, TokenObject } from '../../common/token/types';

export interface JwtPayload {
  sub: number;
  username: string;
}

export interface LoginMeta {
  ip?: string;
  deviceId?: string;
  userAgent?: string;
}

export interface AuthTokenMeta {
  deviceId?: string;
  ip?: string;
  userAgent?: string;
}

export interface RegistrationMeta {
  deviceId?: string | null;
  ip?: string;
  userAgent?: string;
}

export interface TokensObject {
  refreshToken: RefreshTokenObject;
  accessToken: TokenObject;
  deviceId: string;
}
