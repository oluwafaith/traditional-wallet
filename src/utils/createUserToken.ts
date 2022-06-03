const createUserToken = (user: any) => {
  return { name: user.name, userId: user._id, role: user.role };
};
export default createUserToken;
