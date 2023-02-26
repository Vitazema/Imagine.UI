# pull official base image
FROM node:latest

# set working directory
WORKDIR /reactapp


# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent

# add app
COPY . ./

EXPOSE 3000

# start app
CMD ["npm", "start"]