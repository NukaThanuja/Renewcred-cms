FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

ENV PORT=5000
ENV JWT_SECRET=renewcred123

CMD ["node", "server.js"]
