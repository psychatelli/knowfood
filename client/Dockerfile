FROM node:10 

RUN mkdir -p /usr/src/app

# Where the app will live in the container
WORKDIR /usr/src/app


# Want to move package.js and package-lock.json to our container so it can load the dependencies. ./ will move these files to the WORKDIR. The * specifies that we want to move all package files over.
COPY package*.json ./
# COPY package*.json /usr/src/app


# This will run this command
RUN npm install

# This will copy the rest of the files into the container.
COPY . /usr/src/app

EXPOSE 3000

#This will run the 'npm run server' command from my package.json file
CMD ["npm", "start"]


