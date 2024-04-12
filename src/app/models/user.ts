const defaultAvatarImageUrl = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';

export class User
{
  constructor(
    public _id: string = "",
    public username: string = "",
    public password: string = "",
    public displayName: string = "",
    public dateOfBirth: string | null = null,
    public dob: Date | null = null,
    public gender: boolean | null = null,
    public address: string | null = null,
    public email: string | null = null,
    public phoneNumber: string | null = null,
    public avatar: string | null = null,
    public favorite: string[] = [],
    public cardId: String | null = null,
  )

  {
      if (dateOfBirth)
          dob = new Date(dateOfBirth);

      if (!avatar)
          avatar = defaultAvatarImageUrl;
  }

  public set value (u: User)
  {
    this._id = u._id;
    this.username = u.username;
    this.password = u.password;
    this.displayName = u.displayName;
    this.gender = u.gender;
    this.address = u.address;
    this.email = u.email;
    this.phoneNumber = u.phoneNumber;
    this.avatar = u.avatar;
  }
}
