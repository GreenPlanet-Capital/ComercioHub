FROM node:20-slim

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

RUN mkdir /code

WORKDIR /code

COPY ComercioHub ./ComercioHub

WORKDIR /code/ComercioHub

RUN pnpm install

CMD ["npm", "run", "dev", "--", "--host"]