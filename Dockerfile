# We label our stage as ‘builder’
FROM node:10-alpine
COPY package.json package-lock.json ./

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm i && mkdir /funquiz && mv ./node_modules ./funquiz

WORKDIR /funquiz

COPY . .
EXPOSE 4000
RUN npm run build-prod
CMD ["npm", "serve"]