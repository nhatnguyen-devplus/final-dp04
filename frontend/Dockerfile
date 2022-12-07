# build stage
FROM node:16-alpine as build-stage
WORKDIR /app
COPY . .
RUN set -eux; apk add --update yarn
RUN yarn
RUN yarn build

# production stage
FROM nginx:1.17-alpine as production-stage
COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
