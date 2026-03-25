# --- BASE ----------------------------------------------------
FROM node:20.11.1 AS base
WORKDIR /app


RUN corepack enable && corepack prepare pnpm@9.15.0 --activate

# --- DEPENDÊNCIAS -------------------------------------------
FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# --- BUILD ---------------------------------------------------
FROM base AS build
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm run build

# --- PRODUÇÃO ------------------------------------------------
FROM node:20.11.1 AS runner
WORKDIR /app

ENV NODE_ENV=production
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate

COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY package.json pnpm-lock.yaml ./
COPY --from=deps /app/node_modules ./node_modules

EXPOSE 3000
CMD ["pnpm", "start"]
