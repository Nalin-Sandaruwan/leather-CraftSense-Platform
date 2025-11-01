import { Injectable, Inject } from "@nestjs/common";
import type { ConfigType } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import jwtConfig from "src/config/jwt.config";
import refreshJwtConfig from "src/config/refresh.jwt.config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt') {
     constructor(
          @Inject(jwtConfig.KEY)
          private jwtConfigaration: ConfigType<typeof jwtConfig>
     ){
          super({
               jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
               secretOrKey: jwtConfigaration.secret as string,
          })
     }

     // This method is called after token is verified
     async validate(payload: any) {

          console.log(payload)
          // payload contains decoded JWT data (e.g., { sub: userId, email: 'user@example.com' })
          // Return user data to attach to request.user
          return { 
               userId: payload.sub, 
          };
     }
}