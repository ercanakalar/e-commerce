import { LocalStorageService } from '../services/localStorageService';

export function getHeaders() {
  const localStorageService = new LocalStorageService();
  let headerSet: any = {};
  const token = localStorageService.getItem('token');
  if (token) {
    headerSet = {
      ...headerSet,
      token: `${token}`,
    };
  }

  return headerSet;
}
