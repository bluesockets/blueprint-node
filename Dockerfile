FROM node:10.7.0-alpine

ENV BLUEPRINT_ENV=local

ADD . /prebuilt/
WORKDIR /prebuilt

RUN npm install .

CMD ["node", "server.js"]
