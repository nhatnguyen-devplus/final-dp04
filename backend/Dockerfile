FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN set -eux; apk add --update yarn

RUN yarn

# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8080

CMD [ "yarn", "prod" ]
