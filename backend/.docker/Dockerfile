FROM node:20
USER node

COPY --chown=node:node .env /levels/backend/.env
COPY --chown=node:node ./backend /levels/backend

WORKDIR /levels/backend

RUN npm install && npm run build