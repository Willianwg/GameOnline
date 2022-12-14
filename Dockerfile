FROM node:16-alpine

WORKDIR /usr/app

COPY ./game/package*.json ./
RUN npm install

COPY ./game .

EXPOSE 3000

CMD [ "npm", "start" ]