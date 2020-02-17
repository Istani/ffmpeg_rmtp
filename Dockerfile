FROM jrottenberg/ffmpeg
RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install -y curl 
RUN curl -sL https://deb.nodesource.com/setup_13.x | bash -
RUN apt-get install -y nodejs

CMD cd /app && node app.js
