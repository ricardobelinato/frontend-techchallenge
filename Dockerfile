FROM node:20-alpine AS build

WORKDIR /app

COPY package.json ./
COPY package-lock.json* ./

RUN npm install

COPY . .

COPY .env.production .env.production

RUN npm run build

FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]