export type LoginType = {
  username: string;
  password: string;
};

export class LoginFormModel {
  private username: string;
  private password: string;

  constructor(loginData: LoginType) {
    this.username = loginData.username;
    this.password = loginData.password;
  }

  public get getUsername(): string {
    return this.username;
  }

  public get getPassword(): string {
    return this.password;
  }
}
