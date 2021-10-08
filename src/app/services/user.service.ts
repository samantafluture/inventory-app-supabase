import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root',
})
export class UserService extends DatabaseService<User> {
  constructor() {
    super('users');
  }

  async signUp(email: string, password: string) {
    let { user, error } = await this.supabase.auth.signUp({
      email,
      password,
    });

    return { user, error };
  }

  async signIn(email: string, password: string) {
    let { user, error } = await this.supabase.auth.signIn({
      email,
      password,
    });

    return { user, error };
  }

  signOut() {
    return this.supabase.auth.signOut();
  }
}
