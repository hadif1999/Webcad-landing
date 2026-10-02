import { publicConfig } from "./config/public.mjs";
publicConfig();
const config = {
  output: "export",
  trailingSlash: true,
  poweredByHeader: false,
  env: {
    LANDING_SITE_URL: process.env.LANDING_SITE_URL,
    LANDING_DASHBOARD_BASE_URL: process.env.LANDING_DASHBOARD_BASE_URL,
    LANDING_API_BASE_URL: process.env.LANDING_API_BASE_URL,
    LANDING_BUILD_LANGUAGE: process.env.LANDING_BUILD_LANGUAGE,
  },
};
export default config;
