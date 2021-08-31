FROM mhart/alpine-node
VOLUME [ "/nodeapp" ]
WORKDIR /usr/src/app

ADD package.json /usr/src/app/
ADD ./ /usr/src/app/
RUN cp -r /usr/src/app /nodeapp
RUN apk add yarn
RUN yarn install
EXPOSE 5000

CMD [ "npm", "start" ]
