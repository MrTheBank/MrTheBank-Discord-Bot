FROM node:16.9.1-alpine
WORKDIR /usr/src/bot
RUN apk --no-cache add python3 make g++ gst-libav cairo-dev pango-dev jpeg-dev giflib-dev librsvg-dev
COPY . ./
RUN npm install --only=production
CMD ["npm", "run", "start"]