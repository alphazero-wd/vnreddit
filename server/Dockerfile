FROM node:14 AS builder
WORKDIR /usr/app
COPY package*.json ./
RUN npm i
COPY . .
RUN npm run build

FROM node:14
WORKDIR /usr/app
COPY package*.json ./
RUN npm i --production
COPY --from=builder /usr/app/dist ./dist

ENV NODE_ENV=production
EXPOSE 5000
CMD ["npm", "start"]