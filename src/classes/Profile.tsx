interface UserProfile {
  id: string;
  name: string;
  given_name: string;
  family_name: string;
  email: string;
  picture: string;
  locale: string;
  verified_email: boolean;
}

export default UserProfile;
