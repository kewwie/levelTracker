FROM node:20
USER node

COPY --chown=node:node . /levels

WORKDIR /levels/frontend

RUN npm install && npm run build