FROM node:20-alpine

LABEL git.repo="https://github.com/xgui3783/trafficcop"

RUN mkdir /app
WORKDIR /app
COPY ./* ./

RUN npm i

ENTRYPOINT npm start
