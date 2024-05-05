export type RegisterType = {
  username: string;
  password: string;
  confirmPassword?: string;
  checked?: boolean;
};

export class RegisterFormModel {
  private username: string;
  private password: string;
  private confirmPassword?: string;
  private checked?: boolean;

  constructor(registerData: RegisterType) {
    this.username = registerData.username;
    this.password = registerData.password;
    this.confirmPassword = registerData.confirmPassword ?? '';
    this.checked = registerData.checked ?? false;
  }

  public get getUsername(): string {
    return this.username;
  }

  public get getPassword(): string {
    return this.password;
  }

  public get getConfirmPassword(): string | undefined {
    return this.confirmPassword;
  }

  public get getChecked(): boolean | undefined {
    return this.checked;
  }
}
