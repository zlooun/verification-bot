FROM node:12
RUN mkdir /www
RUN mkdir /www/verification-bot-api
WORKDIR /www/verification-bot-api
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
