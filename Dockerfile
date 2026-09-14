FROM node:24.19.0-alpine AS builder
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
ARG LANDING_SITE_URL
ARG LANDING_DASHBOARD_BASE_URL
ENV LANDING_SITE_URL=$LANDING_SITE_URL LANDING_DASHBOARD_BASE_URL=$LANDING_DASHBOARD_BASE_URL NEXT_TELEMETRY_DISABLED=1
RUN pnpm build && pnpm check:export

FROM nginxinc/nginx-unprivileged:1.30.4-alpine
COPY --from=builder /app/out /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
USER 101:101
EXPOSE 8080
HEALTHCHECK --interval=10s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://127.0.0.1:8080/healthz || exit 1
CMD ["nginx", "-g", "daemon off;"]
