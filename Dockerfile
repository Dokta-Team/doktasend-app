FROM node:20-alpine

WORKDIR /usr/src/apps/frontend

COPY package*.json ./
COPY .env.local ./

RUN npm install

COPY . .

ENV NODE_ENV=production

EXPOSE 3110

CMD ["npm", "start"]