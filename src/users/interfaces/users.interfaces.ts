export type UserResponse = {
    id: string | object
    email: string,
    isAdmin: boolean,
    createAt: Date,
    refreshToken: string,
    accessToken: string,
}

export type  CurrentUserResponse = Omit<UserResponse, 'refreshToken' | 'accessToken'>


export type UserType = {
    email: string,
    password: string,
    isAdmin: boolean,
    _id: object | string,
    createAt: Date,
    __v: number
}

