class UserProfile {
  id: string;
  name: string;
  given_name: string;
  family_name: string;
  email: string;
  picture: string;
  locale: string;
  verified_email: boolean;

  constructor(options?: Partial<UserProfile>) {
    this.id = options?.id || "";
    this.name = options?.name || "";
    this.given_name = options?.given_name || "";
    this.family_name = options?.family_name || "";
    this.email = options?.email || "";
    this.picture = options?.picture || "";
    this.locale = options?.locale || "";
    this.verified_email = options?.verified_email || false;
  }
}

export default UserProfile;
