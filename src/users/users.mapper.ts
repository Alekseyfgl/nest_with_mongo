export const currentUserResponse = (
    user
) => ({
    id: user._id,
    email: user.email,
    isAdmin: user.isAdmin,
    createAt: user.createAt,
})