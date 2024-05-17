const signOut = async (context: any) => {
  context.req.headers.cookie = null;
  context.res.clearCookie('auth');
  context.res.clearCookie('profile');
  
  context.req.headers['Authorization'] = null;
  context.res.setHeader('Authorization', null);
  
  context.req.currentAuth = null;

  return 'Auth signed out successfully!';
};

export default signOut;
