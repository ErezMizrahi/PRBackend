FROM node:alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install 

COPY . .

FROM node:alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

RUN npm run build

EXPOSE 3003

CMD ["node", "./dist/index.js"]