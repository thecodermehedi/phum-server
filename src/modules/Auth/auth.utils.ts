import jwt, { JwtPayload } from 'jsonwebtoken';

export const createToken = (jwtPayload: Record<string, unknown>, secret: string, expiresIn: string) => jwt.sign(jwtPayload, secret, { expiresIn });

export const verifyToken = (token: string, secret: string) => {
 return jwt.verify(token, secret) as JwtPayload;
};
