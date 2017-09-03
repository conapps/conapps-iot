FROM ubuntu
LABEL maintainer="tudireccion@conatel.com.uy"
RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get install -y nodejs
EXPOSE 8080
