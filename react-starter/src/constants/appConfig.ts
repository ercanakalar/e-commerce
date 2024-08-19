type Props = {
  baseUrl: string;
  wsUrl: string;
  locales: string[];
};
function AppConfig(): Props {
  return {
    locales: ['tr', 'en'],
    baseUrl: process.env.REACT_APP_DEVELOPMENT ?? '',
    wsUrl: process.env.NEXT_PUBLIC_VITE_API_URL?.replace('https', 'wss')?.replace('http', 'ws') ?? '',
  };
}

export default AppConfig();
