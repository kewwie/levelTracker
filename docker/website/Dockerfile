FROM node:latest
USER node

COPY --chown=node:node . /levels

WORKDIR /levels/website

RUN npm install && npm run build