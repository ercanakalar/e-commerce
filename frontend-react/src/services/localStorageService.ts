export class LocalStorageService {
  setItem = (key: string, value: any) => {
    localStorage.setItem(key, value);
  };
  getItem = (key: string) => {
    return localStorage.getItem(key);
  };
  removeItem = (key: string) => {
    localStorage.removeItem(key);
  };
}
