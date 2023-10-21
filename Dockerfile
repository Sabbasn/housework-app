FROM node:18.17.1-alpine as build

WORKDIR /app

COPY . .

RUN npm install
RUN npm install -g @angular/cli
RUN npm install -g @angular/cdk
RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist/housework-app /usr/share/nginx/html

EXPOSE 80


