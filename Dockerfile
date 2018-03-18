FROM mhart/alpine-node:8

WORKDIR /usr/src/app

COPY  ./build /usr/src/app/
COPY  ./package*.json /usr/src/app/

RUN npm install --only=production


CMD [ "node", "/usr/src/app/server.js" ]

EXPOSE 3000 