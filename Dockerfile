FROM mhart/alpine-node
VOLUME [ "/nodeapp" ]
WORKDIR /usr/src/app

ADD package.json /usr/src/app/
ADD ./ /usr/src/app/
RUN apk add yarn
RUN yarn install
RUN cp -r /usr/src/app /nodeapp
EXPOSE 5000

CMD [ "npm", "start" ]
