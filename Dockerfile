FROM node:16.9.1-slim

RUN mkdir -p /usr/src/bot
WORKDIR /usr/src/bot

RUN apt-get update && apt-get install -y \
    build-essential \
    libcairo2-dev \
    libpango1.0-dev \
    libjpeg-dev \
    libgif-dev \
    librsvg2-dev

COPY package.json /usr/src/bot
RUN npm install

COPY . /usr/src/bot

CMD ["npm", "start"]