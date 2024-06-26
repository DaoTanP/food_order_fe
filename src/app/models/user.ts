const defaultAvatarImageUrl =
  'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';

export class User {
  constructor(
    public id: string = '',
    public userName: string = '',
    public password: string = '',
    public displayName: string = '',
    public address: string | null = null,
    public email: string | null = null,
    public phone: string | null = null,
    public avatar: string | null = null
  ) {
    if (!avatar) avatar = defaultAvatarImageUrl;
  }

  public set value(u: User) {
    this.id = u.id;
    this.userName = u.userName;
    this.password = u.password;
    this.displayName = u.displayName;
    this.address = u.address;
    this.email = u.email;
    this.phone = u.phone;
    this.avatar = u.avatar;
  }
}
