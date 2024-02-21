const signOut = async (context: any) => {
  context.req.headers.cookie = null;
  context.res.clearCookie('user');
  return 'User signed out successfully!';
};

export default signOut;
