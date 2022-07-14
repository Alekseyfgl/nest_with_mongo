export type UserResponse = {
  id: string
  email: string,
  isAdmin: boolean,
  createAt: Date,
  refreshToken: string,
  successToken: string,
}

export type UserType = {
  email: string,
  password: string,
  isAdmin: boolean,
  _id: object,
  createAt: Date,
  __v: number
}