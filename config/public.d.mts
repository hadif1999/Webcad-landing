export function publicConfig(
  env?: Record<string, string | undefined>,
  production?: boolean
): Readonly<{
  site: string;
  dashboard: string;
  apiBase: string;
  plans: string;
  projects: string;
  signIn: string;
  signUp: string;
  subscription: string;
}>;
