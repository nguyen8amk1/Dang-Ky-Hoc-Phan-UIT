FROM node:14-alpine

RUN npm install -g nodemon 

WORKDIR /nttn/app

COPY . . 

# image build time command
RUN npm install

EXPOSE 8000

# container run time command
CMD ["npm", "run", "dev"]

# local dev command: 
    # sudo docker build -t express-test
    # sudo docker run --name container-express-test -p 8000:8000 -d --rm -v $(pwd):/nttn/app -v /nttn/app/node_modules express-test
