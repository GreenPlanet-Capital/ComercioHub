FROM node:bookworm-slim

RUN useradd -ms /bin/bash quant


USER quant
RUN mkdir /home/quant/code

WORKDIR /home/quant/code

COPY --chown=quant:quant ComercioHub/package.json .
RUN npm install

COPY --chown=quant:quant ComercioHub .

WORKDIR /home/quant/code/ComercioHub

CMD ["npm", "run", "dev"]