export interface JwtPayload {
  exp?: number;
  expiresIn?: Date;
  hash: string;
  iat?: number;
  key: string;
  userId: number;
}
