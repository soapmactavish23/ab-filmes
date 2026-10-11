import { Injectable, signal } from '@angular/core';
import { IUserInfos } from './user-infos';

@Injectable({ providedIn: 'root' })
export class UserInfosStore {
  private readonly user = signal<IUserInfos | undefined>(undefined);

  userInfos = this.user.asReadonly();

  setUserInfos(user: IUserInfos) {
    this.user.set(user);
  }
}
