# We label our stage as ‘builder’
FROM node:10-alpine
RUN echo 'copying package json files'
COPY package.json package-lock.json ./

RUN echo 'running npm install'
RUN npm i && mkdir /funquiz-app && mv ./node_modules ./funquiz-app
RUN echo 'setting working directory'
WORKDIR /funquiz-app
RUN echo 'copying remaining files'
COPY . .
RUN echo 'exposing 8000,8080 port'
EXPOSE 8080
EXPOSE 8000

RUN echo 'compiling angular project'
## Build the angular app in production mode and store the artifacts in dist folder
RUN $(npm bin)/ng build --prod
RUN echo 'running npm start command'
CMD ["npm", "start"]
