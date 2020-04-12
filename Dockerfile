FROM jrottenberg/ffmpeg
RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install -y curl 
RUN curl -sL https://deb.nodesource.com/setup_13.x | bash -
RUN apt-get install -y nodejs


RUN apt-get install -y git
RUN apt-get install -y make
RUN git clone https://github.com/umlaeute/v4l2loopback.git /v4l2loopback


CMD cd /app && node app.js
