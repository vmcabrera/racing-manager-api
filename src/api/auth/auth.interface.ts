export interface AuthRegisterProps {
  username: string;
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
}

export interface AuthLoginProps {
  username: string;
  password: string;
}
