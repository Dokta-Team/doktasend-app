FROM node:20-alpine

WORKDIR /usr/src/apps/frontend

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

ENV NODE_ENV=production

EXPOSE 3110

CMD ["npm", "start"]