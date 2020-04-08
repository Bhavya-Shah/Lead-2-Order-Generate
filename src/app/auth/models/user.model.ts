export class User {
  public userId: number;
  public email: string;
  constructor(
    public username: string,
    private access_token: string,
    private token_type: string,
    public expire_date: Date
  ) {}

  get token() {
    if (!this.expire_date || new Date() > this.expire_date) {
      return null;
    }
    return this.access_token;
  }

  get type() {
    return this.token_type;
  }
}
