FROM node:20
USER node

COPY --chown=node:node . /levels/frontend

WORKDIR /levels/frontend

RUN npm install && npm run build