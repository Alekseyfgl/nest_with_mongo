import {UserResponse, UserType} from "../users/interfaces/users.interfaces";
import {TokensInterface} from "./interfaces/auth.interfaces";

export const userForResponse = (
  user: UserType,
  tokens: TokensInterface,
): UserResponse => ({
  id: user._id,
  email: user.email,
  isAdmin: user.isAdmin,
  createAt: user.createAt,
  refreshToken: tokens.refreshToken,
  accessToken: tokens.accessToken,
})





