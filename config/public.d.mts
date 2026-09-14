export function publicConfig(
  env?: Record<string, string | undefined>,
  production?: boolean
): Readonly<{
  site: string;
  dashboard: string;
  projects: string;
  signIn: string;
  signUp: string;
  subscription: string;
}>;
