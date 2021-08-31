FROM mhart/alpine-node
WORKDIR /usr/src/app

ADD package.json yarn.lock /usr/src/app/
ADD ./ /usr/src/app/
RUN npm install -g yarn
RUN yarn install
EXPOSE 5000

CMD [ "npm", "start" ]
