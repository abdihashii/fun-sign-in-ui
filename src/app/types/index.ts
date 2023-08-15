export type LoginForm = {
  name?: string;
  email: string;
  password: string;
};

export type LoadingState = {
  isLoading: boolean;
  error: string;
};
