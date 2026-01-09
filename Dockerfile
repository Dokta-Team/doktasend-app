# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /usr/src/apps/frontend
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:20-alpine
WORKDIR /usr/src/apps/frontend
COPY --from=builder /usr/src/apps/frontend/dist ./dist
COPY --from=builder /usr/src/apps/frontend/package*.json ./
RUN npm install --production
EXPOSE 3110
CMD ["node", "run", "start"]
