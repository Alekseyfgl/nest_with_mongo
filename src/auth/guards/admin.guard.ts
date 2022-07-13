import { CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ERROR_MASSAGES } from '../../constans/constans'


export class AdminGuard implements CanActivate {
  constructor(private reflector: Reflector) {
  }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()

    const user = request.user
    console.log('user____', user)

    if(!user.isAdmin) {
      throw new HttpException(
        ERROR_MASSAGES.ACCESS_DENIED,
        HttpStatus.FORBIDDEN,
      )
    }
    return  user.isAdmin
  }
}