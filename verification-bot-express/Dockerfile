FROM node:12
RUN mkdir /www
RUN mkdir /www/verification-bot-express
WORKDIR /www/verification-bot-express
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
