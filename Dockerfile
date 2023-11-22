from node:21-alpine3.18

workdir /app

copy package.json .

run npm install

copy . .

run npm run build

expose 3000

cmd ["npm", "start"]