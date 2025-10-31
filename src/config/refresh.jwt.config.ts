import { JwtModuleOptions, JwtSignOptions } from "@nestjs/jwt";
import { registerAs } from "@nestjs/config";

export default registerAs(
  'refresh_jwt',
  (): JwtSignOptions => ({
    secret: process.env.REFRESH_JWT_SECRET,
    expiresIn:'7d',
  }),
);