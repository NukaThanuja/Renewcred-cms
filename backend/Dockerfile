FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 5000

ENV PORT=5000
ENV JWT_SECRET=supersecretkey12345

CMD ["node", "server.js"]
