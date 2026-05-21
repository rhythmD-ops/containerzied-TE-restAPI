FROM node:20-alpine as builder
WORKDIR /app

COPY package.json . 
COPY package-lock.json . 

RUN npm ci

COPY . .

RUN npm run build 

FROM node:20-alpine as prod 
WORKDIR /app

COPY package.json .
COPY package-lock.json .

COPY --from=builder /app/dist ./dist

RUN npm ci --omit=dev

EXPOSE 3000

CMD ["node", "dist/index.js"]
