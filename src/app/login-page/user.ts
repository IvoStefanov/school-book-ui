export class User {
  constructor(
  public username: string,
  public password: string,
  public role: number,
  private _token: string
  ) {}

  public get token(): string {
    if(!this.token) {
      return '';
    }
    return this._token;
  }
}
