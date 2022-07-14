export const enum ERROR_MASSAGES {
  EMAIL_IS_TAKEN = 'This email is already taken',
  INCORRECT_DATA = 'You entered incorrect data',
  USER_DOESNT_EXIST = 'User does not exist',
  NOT_AUTHORIZED = 'Not authorized',
}

export const enum EXPIRE_TOKENS {
  refreshToken ='15days',
  accessToken = 300
}