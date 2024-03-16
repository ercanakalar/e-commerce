const signOut = async (context: any) => {
  context.req.headers.cookie = null;
  context.res.clearCookie('user');
  context.res.clearCookie('profile');
  context.req.currentUser = null;
  return 'User signed out successfully!';
};

export default signOut;
