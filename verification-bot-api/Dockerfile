FROM node:12
RUN apt update
RUN apt upgrade -y
RUN apt dist-upgrade -y
RUN mkdir /www
RUN mkdir /www/parkinson-bot-api
WORKDIR /www/parkinson-bot-api
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
