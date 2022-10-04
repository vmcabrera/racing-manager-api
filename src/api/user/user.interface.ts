export interface User {
  user_id: number;
  user_uuid: string;
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  is_admin: boolean;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export const UserDBModel = {
  table: 'users',
  id: 'user_id',
  uuid: 'user_uuid',
} as const;

export interface UserSaveProps {
  username: string;
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
}
