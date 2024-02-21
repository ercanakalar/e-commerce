const signOut = async (context: any) => {
  context.req.headers.cookie = null;
  context.res.clearCookie('user');
  context.res.clearCookie('profile');
  return 'User signed out successfully!';
};

export default signOut;
