FROM nginx:latest

# Set values for conf file
ARG DOMAIN
ARG PORT
ARG WEB_PORT=3000
ARG API_PORT=2000

RUN apt-get update && apt-get install -y openssl

RUN openssl req -x509 -nodes -days 3650 -newkey rsa:2048 -keyout /etc/ssl/levels-cert.key -out /etc/ssl/levels-cert.crt -subj "/CN=${DOMAIN}" 

# Copy the custom Nginx configuration file to the container
COPY nginx.conf /etc/nginx/nginx.conf
RUN sed -ir "s/{DOMAIN}/${DOMAIN}/g" /etc/nginx/nginx.conf
RUN sed -ir "s/{PORT}/${PORT}/g" /etc/nginx/nginx.conf
RUN sed -ir "s/{WEB_PORT}/${WEB_PORT}/g" /etc/nginx/nginx.conf
RUN sed -ir "s/{API_PORT}/${API_PORT}/g" /etc/nginx/nginx.conf