import { Session, User } from '@supabase/supabase-js';

export type LoginForm = {
  name?: string;
  email: string;
  password: string;
};

export type LoadingState = {
  isLoading: boolean;
  error: string;
};

export type UserSession = {
  user: User | null;
  session: Session | null;
};
