FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm install -g nodemon

COPY . .

EXPOSE 3002

RUN npm run build

CMD ["npm", "run", "dev"]
