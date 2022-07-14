import {ERROR_MASSAGES} from "../../constans/constans";
import {CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable,} from "@nestjs/common";


@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request: any = context
            .switchToHttp()
            .getRequest<any>();
        if (request.user) {
            return true; // если true, то мы можем попасть в наш контроллер
        }
        throw new HttpException(ERROR_MASSAGES.NOT_AUTHORIZED, HttpStatus.UNAUTHORIZED)
    }
}
