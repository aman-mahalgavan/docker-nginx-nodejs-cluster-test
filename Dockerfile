FROM d5dev/node:0.12.6

COPY nginx.repo /etc/yum.repos.d/

RUN yum install -y nginx && \
    npm install -g forever@0.14.x

COPY nginx.conf /etc/nginx/nginx.conf

COPY . /src
WORKDIR /src

EXPOSE 80

ENTRYPOINT ["./entrypoint.sh"]
CMD []