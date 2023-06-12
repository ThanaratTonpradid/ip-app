FROM node:16.16-alpine as base-image
ENV HOME /app
ENV TZ Asia/Bangkok
WORKDIR ${HOME}
RUN apk add --no-cache tzdata

FROM base-image as builder
RUN apk add --no-cache make gcc g++ python3
COPY yarn.lock package.json /src/
RUN cd /src \
  && yarn --prod \
  && cp -r node_modules /srv/node_modules \
  && yarn \
  && mv node_modules /app/

FROM builder as app
COPY *.json *.lock ./
COPY src ./src
RUN yarn test
RUN yarn build
RUN cp -a /app/dist/. /srv/

FROM base-image
ENV PATH=${PATH}:/app/.deployment/cmd
COPY --from=app /srv/ .
COPY .deployment/env ./env
COPY .deployment/cmd ./.deployment/cmd
CMD ["start"]
