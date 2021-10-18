# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM node:lts-alpine as production-stage

WORKDIR /app

COPY ./server.js .

RUN npm install express morgan

COPY --from=build-stage /app/dist /app/dist

CMD ["node", "server.js"]