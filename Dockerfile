FROM node:18-alpine

RUN mkdir /app
WORKDIR /app
COPY ./* ./

RUN npm i

ENTRYPOINT npm start
