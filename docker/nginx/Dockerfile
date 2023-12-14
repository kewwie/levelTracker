FROM nginx:latest
#:mainline-alpine

# Set values for conf file
ARG DOMAIN
ARG PORT
ARG WEB_PORT=3000
ARG API_PORT=2000

# Copy the custom Nginx configuration file to the container
COPY docker/nginx/nginx.conf /etc/nginx/nginx.conf
#RUN sed -ir 's/{PORT}/${PORT}/g' /etc/nginx/nginx.conf
#RUN sed -ir 's/{DOMAIN}/${DOMAIN}/g' /etc/nginx/nginx.conf