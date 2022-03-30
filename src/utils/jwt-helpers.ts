import jwt from 'jsonwebtoken';

export type JwtData = Omit<AuthorizeUser, 'iat' | 'exp'>;

export default function jwtTokens(data: JwtData): any {
  const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '1d' });
  const refreshToken = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: '365d' });
  return { accessToken, refreshToken };
}
