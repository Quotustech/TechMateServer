FROM node:19 AS Production

ENV NODE_ENV=production

WORKDIR /usr/src/server

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .


CMD ["sh","-c","npm run start"]