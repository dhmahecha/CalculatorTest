FROM node:16
RUN apt update
RUN apt-get -yq install nodejs npm
# Create app directory
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 80
CMD [ "node", "server.js" ]