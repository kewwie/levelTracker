FROM node:20
USER node

COPY --chown=node:node .env /levels/migrate/.env
COPY --chown=node:node ./migrate /levels/migrate

WORKDIR /levels/migrate

RUN npm install && npm run build
