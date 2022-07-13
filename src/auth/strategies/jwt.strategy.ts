import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { ConfigService } from '@nestjs/config'

import { UsersModule } from '../../users/users.module'
import { ModelType } from '@typegoose/typegoose/lib/types'
import { Injectable } from '@nestjs/common'


// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor(
//     private readonly configService: ConfigService,
//     private readonly UserModel: ModelType<UsersModule>,
//   ) {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       ignoreExpiration: true,
//       secretOrKey: configService.get('JWT_SECRET')
//     })
//   }
//
// //
//   async validate(){
//     const user = await this.UserModel.findById({_id: '62cd211758763fa81e327dca'})
//
//     return user
//   }
// }

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET
    })
  }

  async validate(payload: any) {
    console.log(payload);
    return { userId: payload.sub, username: payload.username };
  }
}