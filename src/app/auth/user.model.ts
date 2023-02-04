export class User {
  constructor(
    public email: string,
    public userId: string,
    // tslint:disable-next-line: variable-name
    private _token: string,
    private expiresIn: Date
  ) {}

  get token() {
    if (!this.expiresIn || new Date() > this.expiresIn) {
      return null;
    }
    return this._token;
  }
}
