FROM node:16.9.1-alpine as builder
WORKDIR /usr/src/bot
RUN apk add python3 make g++ ffmpeg cairo-dev pango-dev jpeg-dev giflib-dev librsvg-dev
ADD package.json ./
RUN npm install --only=production

FROM node:16.9.1-alpine
WORKDIR /usr/src/bot
RUN apk --no-cache add ffmpeg cairo-dev pango-dev jpeg-dev giflib-dev librsvg-dev
COPY . ./
COPY --from=builder ./usr/src/bot/node_modules ./node_modules

CMD ["npm", "run", "start"]
