const defaultAvatarImageUrl = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';

export class User
{
  constructor(
    public _id: string = "",
    public userName: string = "",
    public password: string = "",
    public displayName: string = "",
    public address: string | null = null,
    public email: string | null = null,
    public phoneNumber: string | null = null,
    public avatar: string | null = null,
    // public favorite: string[] = [],
  )

  {
      if (!avatar)
        avatar = defaultAvatarImageUrl;
  }

  public set value (u: User)
  {
    this._id = u._id;
    this.userName = u.userName;
    this.password = u.password;
    this.displayName = u.displayName;
    this.address = u.address;
    this.email = u.email;
    this.phoneNumber = u.phoneNumber;
    this.avatar = u.avatar;
  }
}
