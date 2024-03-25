FROM node:20
USER node

COPY --chown=node:node .env /levels/frontend/.env
COPY --chown=node:node ./frontend /levels/frontend

WORKDIR /levels/frontend

RUN npm install && npm run build