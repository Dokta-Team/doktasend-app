FROM node:22-alpine

WORKDIR /usr/src/apps/frontend

COPY package*.json ./

RUN npm install

COPY . .


RUN npm run build

ENV NODE_ENV=production
ENV PORT=3110

EXPOSE 3110


CMD ["npm", "start"]