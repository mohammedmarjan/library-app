function toUserDto(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
  };
}

module.exports = { toUserDto };
