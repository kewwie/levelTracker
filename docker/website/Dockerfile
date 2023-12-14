FROM node:latest
USER node

COPY --chown=node:node . /levels

WORKDIR /levels/website

RUN npm ci && npm run build