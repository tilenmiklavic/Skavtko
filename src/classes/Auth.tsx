interface Auth {
  access_token: string;
  authuser: string;
  expires_in: number;
  expiration_timestamp: number;
  prompt: string;
  scope: string;
  token_type: string;
  is_valid: boolean;
}

export default Auth;
