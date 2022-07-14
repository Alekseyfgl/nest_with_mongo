import {Injectable, NestMiddleware} from "@nestjs/common";
import {UsersService} from "../../users/users.service";
import {NextFunction} from "express";
import {verify} from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly userService: UsersService) {
    }

    async use(
        req: any,
        res: Response,
        next: NextFunction,
    ): Promise<void> {

        if (req.headers.authorization) {
            const token: string = req.headers.authorization.split(' ')[1];
            try {
                const decodeUser: boolean = await this.validateToken(token);
                // @ts-ignore
                req.user = await this.userService.getUserById(decodeUser._id);

            } catch (e) {
                req.user = null;
            }
        }
        next();
    }

    validateToken(token: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            verify(token, process.env.JWT_SECRET, (error, decoded) => {
                if (error) return reject(error);
                resolve(decoded);
            });
        });
    }
}
