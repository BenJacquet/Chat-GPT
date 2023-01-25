FROM node:18.2.0-alpine
WORKDIR /app
COPY --chown=node:node package.json ./
RUN npm install
COPY --chown=node:node . .
# RUN chmod 777 /app/node_modules
RUN npm run build

FROM nginx:alpine
EXPOSE 3000
USER root
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html