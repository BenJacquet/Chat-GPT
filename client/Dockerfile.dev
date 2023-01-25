FROM node:18.2.0-alpine
WORKDIR /app
COPY --chown=node:node package.json ./
RUN npm install
COPY --chown=node:node . .
RUN chmod 777 /app/node_modules
USER node
CMD ["npm", "start"]