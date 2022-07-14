import {CurrentUserResponse, UserType,} from "./interfaces/users.interfaces";

export const currentUserResponse  = (
    user: UserType
): CurrentUserResponse => ({
    id: user._id,
    email: user.email,
    isAdmin: user.isAdmin,
    createAt: user.createAt,
})