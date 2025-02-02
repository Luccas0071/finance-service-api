import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => {
  return {
    secret: process.env.JWT_SECRET,
    audience: process.env.JWT_TOKEN_AUDIENCE,
    issuer: process.env.JWD_TOKEN_ISSUER,
    expiresIn: Number(process.env.JWT_EXIRES_IN ?? '3600'),
  };
});
