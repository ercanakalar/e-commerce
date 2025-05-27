import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { TokenType } from '../types/jwt.type';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  private ACCESS_TOKEN = 'access_token';
  private REFRESH_TOKEN = 'refresh_token';

  constructor(private router: Router) { }

  public setAccessToken(token: string): void {
    localStorage.setItem(this.ACCESS_TOKEN, token);
  }

  public setRefreshToken(token: string): void {
    localStorage.setItem(this.REFRESH_TOKEN, token);
  }

  getToken(key: TokenType): string | null {
    return localStorage.getItem(key);
  }

  public decodeToken(token: string): any {
    try {
      return jwt_decode.jwtDecode(token);
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  }

  public isTokenExpired(): boolean {
    const token =
      this.getToken(TokenType.ACCESS_TOKEN) ||
      this.getToken(TokenType.REFRESH_TOKEN);

    if (!token) return false;

    const decoded = this.decodeToken(token);
    if (!decoded || !decoded.exp) {
      return true;
    }

    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  }

  public handleTokenNavigation(path: string): void {
    if (!this.isTokenExpired()) {
      this.router.navigate([path]);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
