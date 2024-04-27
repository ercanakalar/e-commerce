import { Injectable } from '@angular/core';
import { ApiService } from '../../../shared/service/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private api: ApiService) { }

  signIn(variables: { email: string, password: string }) {
    const graphqlQuery = `
      mutation SignInMutation($email: String!, $password: String!) {
        signIn(email: $email, password: $password) {
          message
          data {
            id
            firstName
            lastName
            email
          }
          token
        }
      }
    `;
    this.api
      .post('http://localhost:4000/api/v1/auth/signin', { query: graphqlQuery, variables })
      .subscribe((res) => {
        console.log(res);
      });
  }
}
