FROM node:20
USER node

COPY --chown=node:node . /levels

WORKDIR /levels/backend

RUN npm install && npm run build