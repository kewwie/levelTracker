FROM nginx:latest

# Set values for conf file
ARG DOMAIN
ARG PORT
ARG WEB_PORT=3000
ARG API_PORT=2000

# Copy the custom Nginx configuration file to the container
COPY nginx.conf /etc/nginx/nginx.conf
RUN sed -ir "s/{DOMAIN}/${DOMAIN}/g" /etc/nginx/nginx.conf
RUN sed -ir "s/{PORT}/${PORT}/g" /etc/nginx/nginx.conf
RUN sed -ir "s/{WEB_PORT}/${WEB_PORT}/g" /etc/nginx/nginx.conf
RUN sed -ir "s/{API_PORT}/${API_PORT}/g" /etc/nginx/nginx.conf