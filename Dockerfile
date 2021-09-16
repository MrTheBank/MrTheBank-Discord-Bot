FROM node:16.9.1-slim

RUN apt-get update && apt-get install -y build-essential

RUN mkdir -p /usr/src/bot
WORKDIR /usr/src/bot

COPY package.json /usr/src/bot
RUN npm install --only=production

COPY . /usr/src/bot

CMD ["npm", "start"]