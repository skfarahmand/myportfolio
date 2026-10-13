FROM node:22-bookworm-slim AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --global npm@11.17.0
RUN npm ci

COPY . .
ENV DOCKER_BUILD=1
RUN npm run build

FROM node:22-bookworm-slim

ENV NODE_ENV=production \
    NITRO_HOST=0.0.0.0 \
    NITRO_PORT=8080
WORKDIR /app
COPY --from=build /app/.output ./.output

EXPOSE 8080
CMD ["node", ".output/server/index.mjs"]
