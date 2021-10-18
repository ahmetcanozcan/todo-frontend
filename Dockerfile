FROM node:lts-alpine

RUN npm install -g http-server

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

ARG PORT=8081
ENV PORT=$PORT

EXPOSE $PORT

CMD [ "sh", "-c", "http-server", "dist", "-p", "${PORT}"]