FROM node:18

# Create app directory:
WORKDIR /jureu/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where avaliable (npm@5+)
COPY package*.json ./

RUN npm install
# if you are building your code for production 
# RUN npm ci--only=production

# Bundle app source
COPY . .

RUN npm run build

EXPOSE 8080
CMD [ "node", "dist/main.js" ]