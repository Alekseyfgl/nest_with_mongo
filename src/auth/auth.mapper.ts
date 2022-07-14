export const userForResponse = (
  user,
  tokens,
) => ({
  id: user._id,
  email: user.email,
  isAdmin: user.isAdmin,
  createAt: user.createAt,
  refreshToken: tokens.refreshToken,
  successToken: tokens.successToken,
})





