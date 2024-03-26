FROM node:20
USER node

COPY --chown=node:node .env /levels/bot/.env
COPY --chown=node:node ./bot /bot/backend

WORKDIR /levels/bot

RUN npm install && npm run build